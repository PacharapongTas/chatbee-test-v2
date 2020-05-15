import moment from 'moment';
import { BasicImagePicker } from '../../components/basic-image-picker';
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Image, ImageStyle, StatusBar, TextStyle, TouchableOpacity, View, ViewStyle, Clipboard } from "react-native";
import Config from "react-native-config";
import { handleTextInput, withNextInputAutoFocusForm } from "react-native-formik";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { NavigationInjectedProps, NavigationEvents } from "react-navigation";
import * as yup from "yup";
import { Button, CheckBox, Header, Icon, Screen, Text, TextInput } from "../../components";
import { ActivityIndicatorWithContainer } from "../../components/activity-indicator-with-container";
import { PrimaryButton } from "../../components/button/primary-button";
import { OrderPriceSummary } from '../../components/order-price-summary';
import { useNotificationBarContext } from '../../GlobalContext';
import { payWithCreditCard, payWithInternetBanking, uplopadPaymentSlip, payCaptureComplete, verifyChargePaid } from "../../services/api";
import { ReactNativeOmise } from "../../services/api/api-omise";
import { color, spacing } from "../../theme";
import { IChallenge, ICoupon, IDelivery } from '../payment-screen/types';
import { formatCreditCardNumber, formatCVC, formatExpirationDate } from "./Payment";
import { ImagePickerResponse } from 'react-native-image-picker';


const Form = withNextInputAutoFocusForm(View)

const TextInputFormik: any = handleTextInput(TextInput)

const validationSchema = yup.object().shape({
  number: yup
    .string()
    .required()
    .length(19),
  name: yup.string().required(),
  expiry: yup
    .string()
    .required()
    .length(5),
  cvc: yup
    .string()
    .required()
    .length(3),
})

const SiamCommercialBank = require("../../assets/images/payment-siam-commercial.png")
const KasikornBank = require("../../assets/images/payment-kasikorn.png")
const KrungThaiBank = require("../../assets/images/payment-krung-thai.png")
const BualuangBank = require("../../assets/images/payment-bbl.png")
const AyudhyaBank = require("../../assets/images/payment-ayudhya.png")
const Visa = require("../../assets/images/visa.png")
const Mastercard = require("../../assets/images/master-card.png")
const AmericanExpress = require("../../assets/images/american-express.png")

const CONTAINER: ViewStyle = { flex: 1, backgroundColor: color.palette.surface_main }

const BACKGROUND_CONTENT: ViewStyle = {
  backgroundColor: "#161C33",
  borderRadius: 8,
}

const CREDIT_TEXT_TITLE: TextStyle = {
  color: "white",
  fontSize: 16,
  lineHeight: 26,
  fontWeight: "600",
}

const CREDIT_TEXT_DESCRIPTION: TextStyle = {
  color: "white",
  opacity: 0.7,
  fontSize: 12,
  lineHeight: 18,
}

const BANK_TITLE: TextStyle = {
  color: "white",
  fontSize: 14,
  lineHeight: 18,
  fontWeight: "600",
}

const BANK_DESCRIPTION: TextStyle = {
  color: "white",
  fontSize: 12,
  lineHeight: 18,
}

const CONTENT: ViewStyle = {
  padding: spacing.medium,
}

const PAYMENT_BANK_CONTENT: any = isNotActive => ({
  flexDirection: "row",
  paddingHorizontal: spacing.large,
  paddingTop: spacing.medium,
  paddingBottom: isNotActive ? spacing.medium : 0,
})

const PAYMENT_CREDIT_CONTENT: any = () => ({
  flexDirection: "row",
  paddingHorizontal: spacing.large,
  paddingTop: spacing.medium,
  paddingBottom: spacing.medium,
})

const ICON_POSITION: ViewStyle = {
  marginTop: 6,
}


const BANK_CONTAINER: ViewStyle = {
  paddingVertical: spacing.medium,
  paddingHorizontal: spacing.huge,
  flexDirection: "row",
}

const CREDIT_CONTAINER: ViewStyle = {
  paddingVertical: spacing.smaller,
  flexDirection: "row",
}

const LINE: ViewStyle = {
  borderBottomColor: "#707070",
  opacity: 0.2,
  borderBottomWidth: 1,
}

const CREDIT_CARD_FORM: ViewStyle = {
  paddingHorizontal: spacing.large,
  paddingTop: spacing.normal,
  paddingBottom: spacing.large,
}

const VERTICAL_SPACER: ViewStyle = {
  width: spacing.normal,
}

const BUTTON: ViewStyle = {
  marginVertical: spacing.medium,
}

const ITEM: ViewStyle = {
  marginBottom: spacing.smaller,
  backgroundColor: color.darkBackground,
  paddingHorizontal: spacing.normal,
  paddingVertical: spacing.small,
  borderRadius: 10,
  flexDirection: "row",
  alignItems: "center",
}

const ICON: ImageStyle = {
  marginRight: spacing.small,
  width: spacing.normal,
  height: spacing.normal,
}

const TEXT: TextStyle = {
  flex: 1,
  fontWeight: "500",
  fontSize: 14,
  lineHeight: 22,
}

const PAYMENT_TYPE = {
  INTERNET_BANKING: "INTERNET_BANKING",
  CREDIT_CARD: "CREDIT_CARD",
  BANK_TRANSFER: "BANK_TRANSFER",
}

const BANK_NAME = {
  SIAMCOMMERCIALBANK: "internet_banking_scb",
  KRUNGTHAIBANK: "internet_banking_ktb",
  BUALUANGBANK: "internet_banking_bbl",
  AYUDHYABANK: "internet_banking_bay",
}

const DATE_BUTTON: ViewStyle = {
  backgroundColor: 'white', borderRadius: 8, height: 40,
  alignItems: 'flex-start'
}

const DATE_BUTTON_TEXT: TextStyle = {
  color: 'black',
  paddingHorizontal: 0,
  fontSize: 14
}

const BANK_NUMBER = '0691163431'

interface IProps extends NavigationInjectedProps<{}> { }

interface IState {
  activeMethod: string,
  bankActive: string,
  application_id?: number,
  spinner: boolean,
  challenge?: IChallenge,
  delivery?: IDelivery,
  coupon?: ICoupon,
  map: any,
  isAcceptTerms: boolean,
  isReceiveNews: boolean,

  slipImage?: ImagePickerResponse,
  paid_at: string
}

export const PaymentMethodScreen: React.FunctionComponent<IProps> = ({ navigation }) => {
  const [_, setNotificationBarContext] = useNotificationBarContext()

  const [state, setState] = useState<IState>({
    activeMethod: '',
    bankActive: BANK_NAME.SIAMCOMMERCIALBANK,
    application_id: undefined,
    spinner: false,
    challenge: undefined,
    delivery: undefined,
    coupon: undefined,
    map: undefined,
    isAcceptTerms: false,
    isReceiveNews: false,

    slipImage: undefined,
    paid_at: '',
  })

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  useEffect(() => {
    const { application_id, challenge, delivery, coupon, map } = navigation.state.params as any
    setState({ ...state, application_id, challenge, delivery, coupon, map })
  }, [])

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setState({ ...state, paid_at: date.toISOString() })
    hideDatePicker();
  };

  const fetchCapture = async () => {
    // To prevent double-charged
    await setState({ ...state, spinner: true })
    try {
      await verifyChargePaid(state.application_id)
      navigation.navigate("PaymentComplete", {
        capture_id: state.application_id,
        challenge: state.challenge,
        map: state.map,
      })
    } catch (error) {
      console.log(error);
    } finally {
      setState({ ...state, spinner: false })
    }
  }

  const bankTransferSubmit = async () => {
    await setState({ ...state, spinner: true })

    try {
      const data = await uplopadPaymentSlip(state.application_id, state.slipImage, state.paid_at)
        if (data) {
        setNotificationBarContext('Upload สำเร็จ', 'success', true)
                 // @ts-ignore
        navigation.navigate("PaymentComplete", {
          challenge: state.challenge,
          map: state.map,
        })
        } else {
          setNotificationBarContext('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'warning', true)
        }
    } catch (errorResponse) {
      const error = await errorResponse
      setNotificationBarContext(error.detail, 'warning', true)
    } finally {
      setState({ ...state, spinner: false })
    }
  }


  const internetBankingSubmit = async () => {
    await setState({ ...state, spinner: true })

    try {
      await payWithInternetBanking(state.application_id, { type: state.bankActive }).then(data => {
        if (data) {
          navigation.navigate("PaymentWebView", {
            ...data,
            challenge: state.challenge,
            map: state.map,
          })
        } else {
          setNotificationBarContext('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'warning', true)
        }
      })
    } catch (errorResponse) {
      const error = await errorResponse
      setNotificationBarContext(error.detail, 'warning', true)
    } finally {
      setState({ ...state, spinner: false })
    }
  }

  const parseToNumber = (value: string) => {
    if (value) {
      return value.replace(/\s/g, "")
    }
    return value
  }

  const getExpiration = (expirationString: string) => {
    const split = expirationString.split("/")
    const month = split[0]
    const year = split[1]

    return { month, year }
  }

  const onCopyBankNumber = () => {
    Clipboard.setString(BANK_NUMBER)
    setNotificationBarContext('คัดลอกเรียบร้อยแล้ว', 'success', true)
  }

  const handleSubmit = async formData => {
    if (!formData) {
      return
    }

    try {
      await setState({ ...state, spinner: true })
      const transformedNumber = parseToNumber(formData.number)
      const transformedExpiry = getExpiration(formData.expiry)

      const cardInformation = {
        name: formData.name,
        number: transformedNumber,
        expiration_month: transformedExpiry.month,
        expiration_year: transformedExpiry.year,
        security_code: formData.cvc,
      }

      const reactNativeOmise = new ReactNativeOmise()
      reactNativeOmise.config(Config.OMISE_PUBLIC_KEY)

      let response
      try {
        response = await reactNativeOmise.createToken({ card: cardInformation })
      } catch (errorResponse) {
        const error = await errorResponse
        return setNotificationBarContext(error.message, 'warning', true)
      }

      const data = await payWithCreditCard(state.application_id, {
        omise_token: response.id,
      })
      if (data) {
        navigation.navigate("PaymentWebView", {
          ...data,
          challenge: state.challenge,
          map: state.map,
        })
      } else {
        setNotificationBarContext('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง', 'warning', true)
      }
    } catch (error) {
      setNotificationBarContext(error.detail, 'warning', true)
    } finally {
      setState({ ...state, spinner: false })
    }
  }

  const onSubmitPaymentType = async (value: string) => {
    if (value === PAYMENT_TYPE.INTERNET_BANKING) {
      await setState({
        ...state,
        activeMethod: value,
        bankActive: BANK_NAME.SIAMCOMMERCIALBANK,
      })
    } else {
      await setState({
        ...state,
        activeMethod: value,
        bankActive: "",
      })
    }
  }

  const goToPreviousScreen = () => navigation.goBack()

  const onSubmitBankType = (value: string) => {
    setState({
      ...state,
      activeMethod: PAYMENT_TYPE.INTERNET_BANKING,
      bankActive: value,
    })
  }

  return (
    <View testID="PaymentMethodScreen" style={CONTAINER}>
      <NavigationEvents onDidFocus={() => fetchCapture()} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <StatusBar backgroundColor="transparent" translucent />
      <Header headerText="การชำระเงิน" leftIcon="back" onLeftPress={goToPreviousScreen} />
      <Screen style={CONTENT} preset="scroll">
        <View>
          <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>สรุปรายการสั่งซื้อ</Text>
          {state.challenge ? <OrderPriceSummary challenge={state.challenge} delivery={state.delivery} coupon={state.coupon} /> : null}
          <Text style={{ marginTop: 17, marginBottom: 5, fontWeight: 'bold' }}>เลือกวิธีการชำระเงิน</Text>
          <TouchableOpacity style={{marginBottom: spacing.normal}} onPress={() => onSubmitPaymentType(PAYMENT_TYPE.BANK_TRANSFER)}>
            <View style={BACKGROUND_CONTENT}>
              <View style={PAYMENT_BANK_CONTENT(true)}>
                <View style={ICON_POSITION}>
                  {state.activeMethod === PAYMENT_TYPE.BANK_TRANSFER ? <Icon icon="radio" /> : <Icon icon="emptyRadio" />}
                </View>
                <View style={{ marginLeft: spacing.smaller }}>
                  <View>
                    <Text style={CREDIT_TEXT_TITLE}>โอนเงินเข้าบัญชีธนาคาร</Text>
                  </View>
                  <View>
                    <Text style={CREDIT_TEXT_DESCRIPTION}>
                      Safe payment online. Just Upload your slip.
                    </Text>
                  </View>
                  <View>
                    <View style={{marginVertical: 12}}>
                    <View style={{marginVertical: 8}}>
                      <Text>ชื่อบัญชี : บริษัท ดับบลิวเจมส์ จำกัด</Text>
                    </View>
                    <View  style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={KasikornBank} />

                    <View style={{flex: 1, marginLeft: 13 }}>
                      <Text style={{fontSize: 14}}>ธนาคารกสิกรไทย</Text>
                      <Text style={{fontSize: 20}}>{BANK_NUMBER}</Text>
                    </View>
                    <TouchableOpacity 
                    onPress={onCopyBankNumber}
                    style={{
                      borderWidth:1,
                      borderColor:color.inActiveColor,
                      borderRadius: 4,
                      padding: 4,
                      paddingHorizontal: 14
                    }}><Text style={{fontSize: 10}}>คัดลอก</Text></TouchableOpacity>
                    </View>
                    </View>
                    <BasicImagePicker
                      pickerText="อัพโหลดสลิป"
                      onSelect={(response: ImagePickerResponse) => {
                        setState({ ...state, paid_at: new Date().toISOString(), activeMethod: PAYMENT_TYPE.BANK_TRANSFER,slipImage: response })
                      }}
                    />
                    <View style={{ display: 'flex', flexDirection: 'row', marginTop: 18 }}>
                      <View style={{ flex: 1, marginRight: 4 }}>
                        <Text>วันที่โอน</Text>
                        <Button style={DATE_BUTTON} textStyle={DATE_BUTTON_TEXT} text={state.paid_at ? moment(state.paid_at).format('DD/MM/YYYY') : ''} onPress={showDatePicker} />
                      </View>
                      <View style={{ flex: 1, marginLeft: 4 }}>
                        <Text>เวลาที่โอน</Text>
                        <Button style={DATE_BUTTON} textStyle={DATE_BUTTON_TEXT} text={state.paid_at ? moment(state.paid_at).format('HH:mm') : ''} onPress={showDatePicker} />
                      </View>

                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSubmitPaymentType(PAYMENT_TYPE.INTERNET_BANKING)}>
            <View style={{ ...BACKGROUND_CONTENT }}>
              <View style={PAYMENT_BANK_CONTENT(true)}>
                <View style={ICON_POSITION}>
                  {state.activeMethod === PAYMENT_TYPE.INTERNET_BANKING ? <Icon icon="radio" /> : <Icon icon="emptyRadio" />}
                </View>
                <View style={{ marginLeft: spacing.smaller }}>
                  <View>
                    <Text style={CREDIT_TEXT_TITLE}>Internet Banking</Text>
                  </View>
                  <View>
                    <Text style={CREDIT_TEXT_DESCRIPTION}>
                      Safe payment online. Just Upload your slip.
                    </Text>
                  </View>
                </View>
              </View>
              <View style={state.activeMethod !== PAYMENT_TYPE.INTERNET_BANKING && { display: "none" }}>
                <TouchableOpacity onPress={() => onSubmitBankType(BANK_NAME.SIAMCOMMERCIALBANK)}>
                  <View style={BANK_CONTAINER}>
                    <View>
                      <Image source={SiamCommercialBank} />
                    </View>
                    <View style={{ alignContent: "center", marginHorizontal: 13, flex: 1 }}>
                      <Text style={BANK_TITLE}>ธนาคารไทยพาณิชย์</Text>
                      <Text style={BANK_DESCRIPTION}>Siam Commercial Bank</Text>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                      {state.bankActive === BANK_NAME.SIAMCOMMERCIALBANK ? (
                        <Icon icon="radioSelect"></Icon>
                      ) : (
                          <Icon icon="radioNotSelect"></Icon>
                        )}
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={LINE} />
                <TouchableOpacity onPress={() => onSubmitBankType(BANK_NAME.KRUNGTHAIBANK)}>
                  <View style={BANK_CONTAINER}>
                    <View>
                      <Image source={KrungThaiBank} />
                    </View>
                    <View style={{ alignContent: "center", marginHorizontal: 13, flex: 1 }}>
                      <Text style={BANK_TITLE}>ธนาคารกรุงไทย</Text>
                      <Text style={BANK_DESCRIPTION}>Krung Thai Bank</Text>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                      {state.bankActive === BANK_NAME.KRUNGTHAIBANK ? (
                        <Icon icon="radioSelect"></Icon>
                      ) : (
                          <Icon icon="radioNotSelect"></Icon>
                        )}
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={LINE} />
                <TouchableOpacity onPress={() => onSubmitBankType(BANK_NAME.BUALUANGBANK)}>
                  <View style={BANK_CONTAINER}>
                    <View>
                      <Image source={BualuangBank} />
                    </View>
                    <View style={{ alignContent: "center", marginHorizontal: 13, flex: 1 }}>
                      <Text style={BANK_TITLE}>ธนาคารกรุงเทพ</Text>
                      <Text style={BANK_DESCRIPTION}>Bualuang Bank</Text>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                      {state.bankActive === BANK_NAME.BUALUANGBANK ? (
                        <Icon icon="radioSelect"></Icon>
                      ) : (
                          <Icon icon="radioNotSelect"></Icon>
                        )}
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={LINE} />
                <TouchableOpacity onPress={() => onSubmitBankType(BANK_NAME.AYUDHYABANK)}>
                  <View style={BANK_CONTAINER}>
                    <View>
                      <Image source={AyudhyaBank} />
                    </View>
                    <View style={{ alignContent: "center", marginHorizontal: 13, flex: 1 }}>
                      <Text style={BANK_TITLE}>ธนาคารกรุงศรี</Text>
                      <Text style={BANK_DESCRIPTION}>Bank of Ayudhya</Text>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                      {state.bankActive === BANK_NAME.AYUDHYABANK ? (
                        <Icon icon="radioSelect"></Icon>
                      ) : (
                          <Icon icon="radioNotSelect"></Icon>
                        )}
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Formik validationSchema={validationSchema} initialValues={{}} onSubmit={handleSubmit}>
            {({ handleSubmit, values, isValid, setFieldValue, errors }) => (
              <Form>
                <TouchableOpacity onPress={() => onSubmitPaymentType(PAYMENT_TYPE.CREDIT_CARD)}>
                  <View style={{ ...BACKGROUND_CONTENT, marginVertical: spacing.normal }}>
                    <View style={PAYMENT_CREDIT_CONTENT()}>
                      <View style={ICON_POSITION}>
                        {state.activeMethod === PAYMENT_TYPE.CREDIT_CARD ? (
                          <Icon icon="radio" />
                        ) : (
                            <Icon icon="emptyRadio" />
                          )}
                      </View>
                      <View style={{ marginLeft: spacing.smaller }}>
                        <View>
                          <Text style={CREDIT_TEXT_TITLE}>บัตรเครดิต / บัตรเดบิต</Text>
                        </View>

                        <View>
                          <Text style={CREDIT_TEXT_DESCRIPTION}>
                            Safe payment transfer using your bank account. Visa, Mastercard,
                            American Express
                          </Text>
                        </View>

                        <View style={CREDIT_CONTAINER}>
                          <View style={{ marginRight: spacing.smaller }}>
                            <Image source={Visa} />
                          </View>
                          <View style={{ marginRight: spacing.smaller }}>
                            <Image source={Mastercard} />
                          </View>
                          <View>
                            <Image source={AmericanExpress} />
                          </View>
                        </View>
                      </View>
                    </View>
                    <View style={state.activeMethod !== PAYMENT_TYPE.CREDIT_CARD && { display: "none" }}>
                      <View style={CREDIT_CARD_FORM}>
                        <View>
                          <TextInputFormik
                            name="number"
                            labelText="Credit Card Number"
                            keyboardType="numeric"
                            maxLength={19}
                            onChangeText={value => {
                              setFieldValue("number", formatCreditCardNumber(value))
                            }}
                          />
                        </View>
                        <View>
                          <TextInputFormik
                            name="name"
                            labelText="Name On Card"
                            keyboardType="default"
                          />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                          <View style={{ flex: 1 }}>
                            <TextInputFormik
                              name="expiry"
                              labelText="Expiry Date"
                              placeholder="MM/YY"
                              keyboardType="numeric"
                              maxLength={5}
                              onChangeText={value => {
                                setFieldValue("expiry", formatExpirationDate(value))
                              }}
                            />
                          </View>
                          <View style={VERTICAL_SPACER} />
                          <View style={{ flex: 1 }}>
                            <TextInputFormik
                              name="cvc"
                              labelText="CVV Code"
                              placeholder="CVV"
                              keyboardType="numeric"
                              maxLength={3}
                              onChangeText={value => {
                                setFieldValue("cvc", formatCVC(value))
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('PaymentPolicy')} style={ITEM}>
                  <Icon icon={'verified'} style={ICON} />
                  <Text style={TEXT}>{'Terms of Service, Privacy Policy และ Refund Policy'}</Text>
                </TouchableOpacity>
                <CheckBox
                  label="ฉันยืนยันว่าได้อ่านและตกลงกับ Terms of Service, Privacy Policy และ Refund Policy"
                  value={state.isAcceptTerms}
                  onChange={() => setState({ ...state, isAcceptTerms: !state.isAcceptTerms })}
                />
                <CheckBox
                  label="ฉันต้องการรับข้อมูลข่าวสาร, โปรโมชั่น, อีเวนท์, และ สิทธิพิเศษ"
                  value={state.isReceiveNews}
                  onChange={() => setState({ ...state, isReceiveNews: !state.isReceiveNews })}
                />
                <View style={state.activeMethod !== PAYMENT_TYPE.BANK_TRANSFER && { display: "none" }}>
                  <PrimaryButton
                    onPress={bankTransferSubmit}
                    containerStyle={BUTTON}
                    disabled={ !state.slipImage || !state.paid_at ||  !state.isAcceptTerms || state.spinner}
                  >
                    {state.spinner ? <ActivityIndicatorWithContainer /> : <Text>ยืนยันการชำระเงิน</Text>}
                  </PrimaryButton>
                </View>
                <View style={state.activeMethod !== PAYMENT_TYPE.INTERNET_BANKING && { display: "none" }}>
                  <PrimaryButton
                    onPress={internetBankingSubmit}
                    containerStyle={BUTTON}
                    disabled={!state.isAcceptTerms || state.spinner}
                  >
                    {state.spinner ? <ActivityIndicatorWithContainer /> : <Text>ยืนยันการชำระเงิน</Text>}
                  </PrimaryButton>
                </View>
                <View style={state.activeMethod !== PAYMENT_TYPE.CREDIT_CARD && { display: "none" }}>
                  <PrimaryButton
                    disabled={!state.isAcceptTerms || !isValid || state.spinner}
                    onPress={handleSubmit}
                    containerStyle={BUTTON}
                  >
                    {state.spinner ? <ActivityIndicatorWithContainer /> : <Text>ยืนยันการชำระเงิน</Text>}
                  </PrimaryButton>
                </View>
              </Form>
            )}
          </Formik>
        </View>
      </Screen>
    </View>
  )
}
