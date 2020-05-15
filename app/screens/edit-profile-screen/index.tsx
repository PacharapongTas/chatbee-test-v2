import { Formik } from "formik"
import React, { useEffect, useState } from "react"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { handleTextInput, withNextInputAutoFocusForm } from "react-native-formik"
import Spinner from "react-native-loading-spinner-overlay"
import * as yup from "yup"
import { ErrorText, Header, Picker, ProfileImagePicker, Screen, SizeChartModal, Text, TextInput } from "../../components"
import { PrimaryButton } from "../../components/button/primary-button"
import { useNotificationBarContext } from "../../GlobalContext"
import { getCities, getDistricts, getMe, getSubDistricts, updateProfile } from "../../services/api"
import { color, spacing } from "../../theme"
import { SIZE } from "../../utils/constants"


const Form = withNextInputAutoFocusForm(View)

const TextInputFormik: any = handleTextInput(TextInput)

const validationSchema = yup.object().shape({
  first_name: yup.string().required("กรุณากรอกข้อมูล"),
  last_name: yup.string().required("กรุณากรอกข้อมูล"),
  address: yup.string().required("กรุณากรอกข้อมูล"),
  city: yup.string().required("กรุณากรอกข้อมูล"),
  district: yup.string().required("กรุณากรอกข้อมูล"),
  sub_district: yup.string().required("กรุณากรอกข้อมูล"),
  postal_code: yup.string().required("กรุณากรอกข้อมูล"),
  email: yup.string().required("กรุณากรอกข้อมูล"),
  phone_number: yup.string().required("กรุณากรอกข้อมูล"),
  shirt_size: yup.string().required("กรุณากรอกข้อมูล"),
})

const FULL: ViewStyle = {
  flex: 1,
}

const SCREEN: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.large,
}

const CENTER: ViewStyle = {
  alignItems: "center",
}

const TITLE: TextStyle = {
  fontWeight: "700",
  fontSize: 24,
  lineHeight: 37,
  marginTop: spacing.smaller,
  marginBottom: spacing.normal,
}

const TEXTAREA: ViewStyle = {
  height: 90,
}

const UNDERLINE_CONTAINER: ViewStyle = {
  marginTop: spacing.smaller,
  alignSelf: "flex-start",
}

const UNDERLINE_TEXT: TextStyle = {
  fontSize: 12,
  lineHeight: 19,
  textDecorationLine: "underline",
  opacity: 0.85,
}

const BUTTON: ViewStyle = {
  marginTop: spacing.large,
}

export const EditProfileScreen = ({ navigation }) => {
  const [_, setNotificationBar] = useNotificationBarContext();

  const [state, setState] = useState({
    loading: true,
    displayImage: null,
    displayFirstName: "",
    displayLastName: "",
    showModal: false,
    spinner: false,
    imageUploading: false,
    cities: [],
    districts: [],
    subDistricts: [],
  })

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })

  const [userProfile, setUserProfile] = useState({
    profile_picture_id: "",
    address: "",
    phone_number: "",
    shirt_size: "",
    city: "",
    district: "",
    sub_district: "",
    postal_code: "",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const userData = await getMe()
    setUserData({
      ...userData,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
    })
    setUserProfile({
      ...userProfile,
      profile_picture_id: userData.user_profile.profile_picture_id,
      address: userData.user_profile.address,
      phone_number: userData.user_profile.phone_number,
      shirt_size: userData.user_profile.shirt_size,
      city: userData.user_profile.city,
      district: userData.user_profile.district,
      sub_district: userData.user_profile.sub_district,
      postal_code: userData.user_profile.postal_code,
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
    setState({
      ...state,
      displayImage: userData.user_profile.profile_picture,
      displayFirstName: userData.first_name,
      displayLastName: userData.last_name,
      loading: false,
      cities: toPickerItems(cities),
      districts: toPickerItems(districts),
      subDistricts: toPickerItems(subDistricts),
    })
  }

  const fetchDistricts = async cityId => {
    if (cityId) {
      await setState({ ...state, spinner: true })
      const districts = await getDistricts(cityId)
      setState({
        ...state,
        districts: toPickerItems(districts),
        spinner: false,
      })
    }
  }

  const fetchSubDistricts = async districtId => {
    if (districtId) {
      await setState({ ...state, spinner: true })
      const subDistricts = await getSubDistricts(districtId)
      setState({
        ...state,
        subDistricts: toPickerItems(subDistricts),
        spinner: false,
      })
    }
  }

  const toPickerItems = dataList =>
    dataList.map(data => ({ label: data.name, value: data.code.toString() }))

  const getItem = (items, searchKey, searchValue, returnKey) => {
    const result = items.find(item => item[searchKey] === searchValue)
    if (result) {
      return result[returnKey]
    }
    return ""
  }

  const goBack = () => navigation.goBack()
  

  const handleSubmit = async (values) => {
    await setState({ ...state, spinner: true })
    try {
      await updateProfile({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        user_profile: {
          ...values
        },
      })

      setNotificationBar('อัพเดทโปรไฟล์สำเร็จ', 'success', true)

      const { refreshParentState } = navigation.state.params
      await refreshParentState()
      navigation.goBack()
    } catch (e) {
      setNotificationBar(e.detail, 'warning', true)
    }finally {
      setState({ ...state, spinner: false })
    }
  }

  return (
    <View style={FULL}>
      <Header headerText="แก้ไขโปรไฟล์" leftIcon="back" onLeftPress={goBack} />
      <Screen
        preset="scroll"
        backgroundColor={color.darkBackground2}
        loading={state.loading}
        style={SCREEN}
      >
        <Formik
          validationSchema={validationSchema}
          initialValues={{ ...userData, ...userProfile }}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit, setFieldValue, isValid, errors, values }) => (
            <Form>
              <View style={CENTER}>
                <ProfileImagePicker
                  source={state.displayImage ? { uri: state.displayImage.image } : null}
                  onSelect={({ id }) => setFieldValue("profile_picture_id", id)}
                  onUpload={({ uploading }) => setFieldValue("imageUploading", uploading)}
                />
                <Text style={TITLE}>
                  {state.displayFirstName} {state.displayLastName}
                </Text>
              </View>
                
                <TextInputFormik
                  name="first_name"
                  labelText="ชื่อจริง"
                  value={values.first_name}
                />
                <ErrorText error={errors["first_name"] as string} />
                <TextInputFormik
                  name="last_name"
                  labelText="นามสกุล"
                  value={values.last_name}
                />
                <ErrorText error={errors["last_name"] as string} />
                <TextInputFormik
                  name="address"
                  labelText="ที่อยู่"
                  multiline={true}
                  numberOfLines={2}
                  value={values.address}
                  style={TEXTAREA}
                />
                <ErrorText error={errors["address"] as string} />
                <Picker
                  labelText="จังหวัด"
                  placeholder={{ label: "เลือก", value: "" }}
                  items={state.cities}
                  value={getItem(state.cities, "label", values.city, "value")}
                  onValueChange={cityId => {
                    const cityLabel = getItem(state.cities, "value", cityId, "label")
                    fetchDistricts(cityId)
  
                    setFieldValue("city", cityLabel)
                    // setFieldValue("district", "") // this will call "district" onValueChange
                  }}
                  error={errors["city"] ? true : false}
                />
                <ErrorText error={errors["city"] as string} />
                <Picker
                  labelText="อำเภอ/เขต"
                  disabled={!values.city}
                  placeholder={{ label: "เลือก", value: "" }}
                  items={state.districts}
                  value={getItem(state.districts, "label", values.district, "value")}
                  onValueChange={districtId => {
                    const districtLabel = getItem(state.districts, "value", districtId, "label")
                    fetchSubDistricts(districtId)

                    setFieldValue("district", districtLabel)
                    setFieldValue("sub_district", "")
                  }}
                  error={errors["district"] ? true : false}
                />
                <ErrorText error={errors["district"] as string} />
                <Picker
                  labelText="ตำบล/แขวง"
                  disabled={!values.district}
                  placeholder={{ label: "เลือก", value: "" }}
                  items={state.subDistricts}
                  value={getItem(state.subDistricts, "label", values.sub_district, "value")}
                  onValueChange={subDistrictId => {
                    const subDistrictLabel = getItem(
                      state.subDistricts,
                      "value",
                      subDistrictId,
                      "label",
                    )

                    setFieldValue("sub_district", subDistrictLabel)
                  }}
                  error={errors["sub_district"]? true : false}
                />
                <ErrorText error={errors["sub_district"] as string} />
                <TextInputFormik
                  name="postal_code"
                  labelText="รหัสไปรษณีย์"
                  keyboardType="numeric"
                  maxLength={5}
                  value={values.postal_code}
                />
                <ErrorText error={errors["postal_code"] as string} />
                <TextInputFormik
                  name="email"
                  labelText="อีเมล"
                  keyboardType="email-address"
                  value={userData.email}
                />
                <ErrorText error={errors["email"] as string} />
                <TextInputFormik
                  name="phone_number"
                  labelText="เบอร์โทรศัพท์"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={values.phone_number}
                />
                <ErrorText error={errors["phone_number"] as string} />
                <Picker
                  labelText="ไซต์เสื้อ"
                  placeholder={{ label: "เลือกไซต์เสื้อ", value: null }}
                  items={SIZE}
                  value={values.shirt_size}
                  onValueChange={shirt_size => {
                    setFieldValue("shirt_size", shirt_size)
                  }}
                  error={errors["shirt_size"] ? true :false}
                />
                <ErrorText error={errors["shirt_size"] as string} />
              <TouchableOpacity
                onPress={() => setState({ ...state, showModal: true })}
                style={UNDERLINE_CONTAINER}
              >
                <Text style={UNDERLINE_TEXT}>ดูขนาดไซส์เสื้อ</Text>
              </TouchableOpacity>
              <PrimaryButton
                disabled={!isValid || state.spinner || state.imageUploading}
                style={BUTTON}
                onPress={handleSubmit}
              >
                <Text>บันทึกข้อมูลส่วนตัว</Text>
              </PrimaryButton>
            </Form>
          )}
        </Formik>
      </Screen>
      <SizeChartModal
        visible={state.showModal}
        onClose={() => setState({ ...state, showModal: false })}
      />
      <Spinner visible={state.spinner} />
    </View>
  )
}
