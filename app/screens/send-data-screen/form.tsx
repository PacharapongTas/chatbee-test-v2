import React, { useEffect, useState, Fragment } from "react"
import { View } from "react-native"
import { withNextInputAutoFocusForm, handleTextInput } from "react-native-formik"
import * as yup from "yup"
import { Formik } from "formik"

import { CONFIRM_BUTTON } from "./styles"
import { Picker, ImagePicker, TextInput, Text, ErrorText } from "../../components"
import { PrimaryButton } from "../../components/button/primary-button"
import { fetchApplications } from "../../services/api"
import { CHALLENGE_TYPES } from "../../utils/constants"
import { NavigationEvents } from 'react-navigation';

const Form = withNextInputAutoFocusForm(View)

const TextInputFormik: any = handleTextInput(TextInput)

const validationSchema = yup.object().shape({
  challengeId: yup.string().required("กรุณาเลือกชาเลนจ์"),
  picture_ids: yup
    .array()
    .of(yup.number())
    .required("กรุณาอัพโหลดรูปภาพ"),
  distance: yup.string().required("กรุณากรอกข้อมูล"),
  time: yup
    .string()
    .required("กรุณากรอกข้อมูล")
    .length(8, "กรุณากรอกเวลา HH:MM:SS"),
  created_at: yup.string("กรุณากรอกข้อมูล"),
})

const FormScreen = ({ state, setState, navigation }) => {
  const [pickerItems, setPickerItems] = useState([])
  const [imageUploading, setImageUploading] = useState(false)

  useEffect(() => {
    fetchAndSetPickItems()
  }, [])

  const fetchAndSetPickItems = () => {
    fetchApplications(true).then(({ results }) => {
      const items = results.map(item => ({
        label: `${item.challenge.event.name} (${CHALLENGE_TYPES[item.challenge.type.toString()]})`,
        value: item.challenge.id,
      }))
      setPickerItems(items)
    })
  }

  const timeFormatText = (oldText, newText) => {
    if (oldText.length < newText.length) {
      const lastChar = newText[newText.length - 1]
      // reject NaN
      if (
        lastChar !== "0" &&
        lastChar !== "1" &&
        lastChar !== "2" &&
        lastChar !== "3" &&
        lastChar !== "4" &&
        lastChar !== "5" &&
        lastChar !== "6" &&
        lastChar !== "7" &&
        lastChar !== "8" &&
        lastChar !== "9"
      ) {
        return oldText
      }
      // limit to number 2 and 5
      if (newText.length === 1 && lastChar !== "0" && lastChar !== "1" && lastChar !== "2") {
        return oldText
      } else if (
        newText.length === 2 &&
        newText[0] === "2" &&
        lastChar !== "0" &&
        lastChar !== "1" &&
        lastChar !== "2" &&
        lastChar !== "3"
      ) {
        return oldText
      } else if (
        (newText.length === 3 || newText.length === 6) &&
        lastChar !== "0" &&
        lastChar !== "1" &&
        lastChar !== "2" &&
        lastChar !== "3" &&
        lastChar !== "4" &&
        lastChar !== "5"
      ) {
        return oldText
      }
      // add colon
      else if (newText.length === 3 || newText.length === 6) {
        return oldText + ":" + lastChar
      }
    } else {
      // remove colon
      if (
        (oldText.length === 7 && newText.length === 6) ||
        (oldText.length === 4 && newText.length === 3)
      ) {
        return oldText.slice(0, -2)
      }
    }
    return newText
  }

  const handleSubmit = formData => {
    navigation.navigate("SendConfirm", { ...state, ...formData })
  }

  return (
    <Fragment>
    <Formik
      validationSchema={validationSchema}
      initialValues={{ challengeId: state.challenge_id }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, setFieldValue, errors, values, isValid }) => (
        <Form>
          <Picker
            name="challengeId"
            labelText="เลือกรายการที่ลงสมัคร"
            placeholder={{ label: "เลือกรายการที่ลงสมัคร", value: null }}
            items={pickerItems}
            value={state.challenge_id}
            onValueChange={(challengeId, index) => {
              const newChalllengeId = challengeId ? challengeId : ''
              setState({
                ...state,
                challenge_id: newChalllengeId,
                previewTitle: newChalllengeId ? pickerItems[index - 1].label : "-",
              })
              setFieldValue("challengeId", newChalllengeId)
            }}
            error={!!errors["challengeId"]}
          />
          <ErrorText error={errors["challengeId"] as string} />
          <ImagePicker
            labelText="แสดงหลักฐานการวิ่ง"
            onSelect={({ id, image, timestamp }) => {
              setFieldValue("picture_ids", [id])
              setFieldValue("created_at", timestamp)
              setState({ ...state, previewImageUrl: image })
            }}
            onUpload={({ uploading }) => setImageUploading(uploading)}
          />
          <ErrorText error={errors["picture_ids"] as string} />
          <TextInputFormik
            name="distance"
            labelText="ระยะทาง"
            placeholder="00.00"
            suffixText="km"
            keyboardType="numeric"
          />
          <ErrorText error={errors["distance"] as string} />
          <TextInputFormik
            name="time"
            labelText="เวลา"
            placeholder="HH:MM:SS"
            suffixText="hr"
            keyboardType="numeric"
            maxLength={8}
            onChangeText={text => setFieldValue("time", timeFormatText(values.time || "", text))}
          />
          <ErrorText error={errors["time"] as string} />
          <PrimaryButton
            disabled={!isValid || imageUploading}
            onPress={handleSubmit}
            containerStyle={CONFIRM_BUTTON}
          >
            <Text>ส่งผลการวิ่ง</Text>
          </PrimaryButton>
        </Form>
      )}
    </Formik>
    </Fragment>    
  )
}

export default FormScreen
