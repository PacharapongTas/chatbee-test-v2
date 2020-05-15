import React, { useState, useEffect } from "react"
import { View, ViewStyle, StatusBar, TextStyle, TouchableOpacity } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import { withNextInputAutoFocusForm, handleTextInput } from "react-native-formik"
import * as yup from "yup"
import { Formik } from "formik"

import { Screen, Header, SizeChartModal, Text, ErrorText } from "../../components"
import { PrimaryButton } from "../../components/button/primary-button"
import { spacing, color } from "../../theme"
import { Picker, TextInput } from "../../components"
import { CONFIRM_BUTTON } from "../send-data-screen/styles"
import { SIZE } from "../../utils/constants"
import { getCities, getDistricts, getSubDistricts, getMe } from "../../services/api"

const Form = withNextInputAutoFocusForm(View)

const TextInputFormik: any = handleTextInput(TextInput)

const validationSchema = yup.object().shape({
  first_name: yup.string().required('กรุณากรอกข้อมูล'),
  last_name: yup.string().required('กรุณากรอกข้อมูล'),
  address: yup.string().required('กรุณากรอกข้อมูล'),
  city: yup.string().required('กรุณากรอกข้อมูล'),
  district: yup.string().required('กรุณากรอกข้อมูล'),
  sub_district: yup.string().required('กรุณากรอกข้อมูล'),
  postal_code: yup.string().required('กรุณากรอกข้อมูล'),
  email: yup.string().required('กรุณากรอกข้อมูล'),
  phone_number: yup.string().required('กรุณากรอกข้อมูล'),
  shirt_size: yup.string().required('กรุณากรอกข้อมูล'),
})

const CONTAINER: ViewStyle = { flex: 1, backgroundColor: color.palette.cloudBurst }

const CONTENT: ViewStyle = {
  paddingHorizontal: spacing.medium,
}

const TEXTAREA: ViewStyle = {
  height: 90,
}

const SIZE_CONTAINER: TextStyle = {
  color: "white",
  textDecorationLine: "underline",
  fontSize: 12,
  lineHeight: 19,
  opacity: 0.85,
}

export interface IProps extends NavigationInjectedProps<{}> {}

export const PaymentFormScreen: React.FunctionComponent<IProps> = ({ navigation }) => {
  const [state, setState] = useState({
    loading: true,
    showModal: false,
  })

  const [pickerItems, setPickerItems] = useState({
    cities: [],
    districts: [],
    subDistricts: [],
  })

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    district: "",
    sub_district: "",
    postal_code: "",
    email: "",
    phone_number: "",
    shirt_size: "",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const toPickerItems = dataList =>
    dataList.map(data => ({ label: data.name, value: data.code.toString() }))

  const getItem = (items, searchKey, searchValue, returnKey) => {
    const result = items.find(item => item[searchKey] === searchValue)
    if (result) {
      return result[returnKey]
    }
    return ""
  }

  const fetchData = async () => {
    const userData = await getMe()
    setUserData({
      first_name: userData.first_name,
      last_name: userData.last_name,
      address: userData.user_profile.address,
      city: userData.user_profile.city,
      district: userData.user_profile.district,
      sub_district: userData.user_profile.sub_district,
      postal_code: userData.user_profile.postal_code,
      email: userData.email,
      phone_number: userData.user_profile.phone_number,
      shirt_size: userData.user_profile.shirt_size,
    })
    const cities = await getCities()
    let districts = []
    try {
      districts = userData.user_profile.city
        ? await getDistricts(getItem(cities, "name", userData.user_profile.city, "code"))
        : []
    } catch {}
    let subDistricts = []
    try {
      subDistricts = userData.user_profile.district
        ? await getSubDistricts(getItem(districts, "name", userData.user_profile.district, "code"))
        : []
    } catch {}
    setPickerItems({
      ...pickerItems,
      cities: toPickerItems(cities),
      districts: toPickerItems(districts),
      subDistricts: toPickerItems(subDistricts),
    })
    setState({ ...state, loading: false })
  }

  const onSelectCity = async cityId => {
    if (cityId) {
      const districts = await getDistricts(cityId)
      setPickerItems({
        ...pickerItems,
        districts: toPickerItems(districts),
      })
    }
  }

  const onSelectDistrict = async districtId => {
    if (districtId) {
      const subDistricts = await getSubDistricts(districtId)
      setPickerItems({
        ...pickerItems,
        subDistricts: toPickerItems(subDistricts),
      })
    }
  }

  const goToPreviousScreen = () => navigation.goBack()

  const handleSubmit = formData => {
    // @ts-ignore
    const { challenge, map, delivery, coupon } = navigation.state.params
    navigation.navigate("PaymentSummary", { formData, challenge, map, delivery, coupon })
  }

  const checkUndefined = (data, value) => {
    if (value === "-") {
      return "-"
    }
    if (data) {
      const valueName = data.find(result => result.value === value)
      return valueName ? valueName.label : ""
    } else {
      return ""
    }
  }

  return (
    <View testID="PaymentFormScreen" style={CONTAINER}>
      <StatusBar backgroundColor="transparent" translucent />
      <Header headerText="ที่อยู่จัดส่ง" leftIcon="back" onLeftPress={goToPreviousScreen} />
      <Screen style={CONTENT} preset="scroll" loading={state.loading}>
        <Formik
          validationSchema={validationSchema}
          initialValues={userData}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, values, isValid, errors }) => (
            <Form>
              <TextInputFormik name="first_name" labelText="ชื่อจริง" keyboardType="default" />
              <ErrorText error={errors["first_name"] as string} />
              <TextInputFormik name="last_name" labelText="นามสกุล" keyboardType="default" />
              <ErrorText error={errors["last_name"] as string} />
              <TextInputFormik
                name="address"
                labelText="ที่อยู่สำหรับจัดส่ง"
                multiline={true}
                numberOfLines={2}
                style={TEXTAREA}
                keyboardType="default"
              />
              <ErrorText error={errors["address"] as string} />
              <Picker
                labelText="จังหวัด"
                placeholder={{ label: "เลือก", value: "" }}
                items={pickerItems.cities}
                value={getItem(pickerItems.cities, "label", userData.city, "value")}
                onValueChange={cityId => {
                  const cityLabel = getItem(pickerItems.cities, "value", cityId, "label")
                  onSelectCity(cityId)
                  setUserData({ ...userData, city: cityLabel, district: "", sub_district: "" })
                  setFieldValue("city", cityLabel)
                }}
                error={errors["city"] ? true : false}
              />
              <ErrorText error={errors["city"] as string} />
              <Picker
                labelText="อำเภอ/เขต"
                disabled={!userData.city}
                placeholder={{ label: "เลือก", value: "" }}
                items={pickerItems.districts}
                value={getItem(pickerItems.districts, "label", userData.district, "value")}
                onValueChange={districtId => {
                  const districtLabel = getItem(pickerItems.districts, "value", districtId, "label")
                  onSelectDistrict(districtId)
                  setUserData({ ...userData, district: districtLabel, sub_district: "" })
                  setFieldValue("district", districtLabel)
                }}
                error={errors["district"] ? true : false}
              />
              <ErrorText error={errors["district"] as string} />
              <Picker
                labelText="ตำบล/แขวง"
                disabled={!userData.district || !pickerItems.subDistricts.length}
                placeholder={
                  userData.district && !pickerItems.subDistricts.length
                    ? { label: "-", value: "-" }
                    : { label: "เลือก", value: "" }
                }
                items={pickerItems.subDistricts}
                value={getItem(pickerItems.subDistricts, "label", userData.sub_district, "value")}
                onValueChange={subDistrictId => {
                  const subDistrictLabel = getItem(
                    pickerItems.subDistricts,
                    "value",
                    subDistrictId,
                    "label",
                  )
                  setUserData({ ...userData, sub_district: subDistrictLabel })
                  setFieldValue("sub_district", subDistrictLabel)
                }}
                error={errors["sub_district"] ? true : false}
              />
              <ErrorText error={errors["sub_district"] as string} />
              <TextInputFormik
                name="postal_code"
                labelText="รหัสไปรษณีย์"
                keyboardType="numeric"
                maxLength={5}
              />
              <ErrorText error={errors["postal_code"] as string} />
              <TextInputFormik name="email" labelText="อีเมล" keyboardType="email-address" />
              <ErrorText error={errors["email"] as string} />
              <TextInputFormik
                name="phone_number"
                labelText="เบอร์โทรศัพท์"
                keyboardType="phone-pad"
                maxLength={10}
              />
              <ErrorText error={errors["phone_number"] as string} />
              <Picker
                labelText="ไซส์เสื้อ"
                placeholder={{ label: "เลือก", value: null }}
                items={SIZE}
                value={values.shirt_size}
                onValueChange={(value, index) => {
                  setUserData({ ...userData, shirt_size: checkUndefined(SIZE, value) })
                  setFieldValue("shirt_size", value)
                }}
                error={errors["shirt_size"] ? true : false}
              />
              <ErrorText error={errors["shirt_size"] as string} />
              <TouchableOpacity
                style={{ marginTop: spacing.smaller, alignSelf: "flex-start" }}
                onPress={() => setState({ ...state, showModal: true })}
              >
                <Text style={SIZE_CONTAINER}>ดูขนาดไซต์เสื้อ</Text>
              </TouchableOpacity>
              <PrimaryButton
                disabled={!isValid}
                onPress={handleSubmit}
                containerStyle={CONFIRM_BUTTON}
              >
                <Text>ดำเนินการต่อ</Text>
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Screen>
      <SizeChartModal
        visible={state.showModal}
        onClose={() => setState({ ...state, showModal: false })}
      />
    </View>
  )
}
