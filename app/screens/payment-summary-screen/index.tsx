import React, { useState, useEffect } from "react"
import {
  StatusBar,
  TextStyle,
  View,
  ViewStyle,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import NumberFormat from "react-number-format"

import { Header, Screen, Icon, Map, Text } from "../../components"
import { color, spacing } from "../../theme"
import { PrimaryButton } from "../../components/button/primary-button"
import { createApplication } from "../../services/api"
import { SIZE } from "../../utils/constants"
import { IMapProps } from "../../components/map/map.props"
import { Payment } from "../../utils/payment"
import { useNotificationBarContext } from "../../GlobalContext"

const CONTAINER: ViewStyle = { flex: 1, backgroundColor: color.palette.surface_main }

const MAP_CONTAINER: ViewStyle = { backgroundColor: color.palette.mirrage }

const CONTENT: ViewStyle = {
  paddingVertical: spacing.large,
  paddingHorizontal: spacing.medium,
}

const BACKGROUND_CONTENT: ViewStyle = {
  backgroundColor: "#161C33",
  paddingHorizontal: spacing.large,
  paddingVertical: spacing.medium,
  borderRadius: 8,
  marginBottom: spacing.normal,
}

const TITLE_CONTENT: ViewStyle = {
  paddingVertical: spacing.smaller,
}

const TITLE_TEXT: TextStyle = {
  fontWeight: "600",
  fontSize: 16,
  paddingVertical: spacing.tiny,
}

const TEXT: TextStyle = {
  fontSize: 12,
  lineHeight: 20,
  opacity: 0.7,
}

const TEXT_BOLD: TextStyle = {
  fontSize: 12,
  lineHeight: 19,
  fontWeight: "bold",
}

const EDIT_CONTAINER: ViewStyle = {
  justifyContent: "space-between",
  flexDirection: "row",
}

const renderActivityIndicator = () => <ActivityIndicator size="large" color={color.palette.white} />

interface IProps extends NavigationInjectedProps<{}> {}

interface IState {
  loading: boolean;
  challenge: any;
  formData: any;
  map: IMapProps | null;
}

export const PaymentSummaryScreen: React.FunctionComponent<IProps> = ({ navigation }) => {
  const [_, setNotificationBar] = useNotificationBarContext()
  const [state, setState] = useState<IState>({
    loading: true,
    challenge: undefined,
    formData: undefined,
    map: null,
  })

  // @ts-ignore
  const { delivery, coupon } = navigation.state.params

  useEffect(() => {
    // @ts-ignore
    const { formData, challenge, map, deliveryId } = navigation.state.params
    setState({ ...state, loading: false, formData, challenge, map })
  }, [])

  const goToPreviousScreen = () => navigation.goBack()

  const confirmPurchase = async () => {
    try {
    await createApplication({
      challenge_id: state.challenge.id,
      ...state.formData,
      delivery_id: delivery.id,
      coupon_slug: coupon ? coupon.slug : '',
    }).then(data => {
      if (data) {
        if (data.payment.paid) {
          setNotificationBar('คุณลงสมัครสำเร็จ', 'success', true)
          navigation.navigate("ChallengeFullDetail", { challengeId: state.challenge.id })
        } else {
          navigation.navigate("PaymentMethod", {
            application_id: data.id,
            challenge: state.challenge,
            delivery,
            coupon,
            map: state.map,
          })
        }
      }
    })
   } catch (error) {
      setNotificationBar(error.detail, 'warning', true)
    }
  }

  const { challenge, loading, formData, map } = state

  const sizeDescription = SIZE.find(size => size.value === (formData && formData.shirt_size))

  return (
    <View testID="PaymentSummaryScreen" style={CONTAINER}>
      <StatusBar backgroundColor="transparent" translucent />
      <Header headerText="รายการสั่งซื้อ" leftIcon="back" onLeftPress={goToPreviousScreen} />
      <Screen style={CONTENT} preset="scroll">
        {loading
          ? renderActivityIndicator()
          : challenge && (
              <View>
                <View style={BACKGROUND_CONTENT}>
                  <View style={MAP_CONTAINER}>{map && <Map event={challenge.event} {...map} />}</View>
                  <View style={TITLE_CONTENT}>
                    <Text style={TITLE_TEXT}>{challenge.event.name}</Text>
                    <NumberFormat
                      value={Payment.calculateFinalPrice(challenge, delivery, coupon)}
                      displayType="text"
                      decimalScale={2}
                      thousandSeparator
                      suffix=" ฿"
                      renderText={text => <Text style={TITLE_TEXT}>{text}</Text>}
                    />
                  </View>
                  <View>
                    <Text style={TEXT}>{`ประเภท: ${challenge.event.name}`}</Text>
                    <Text style={TEXT}>จำนวน: 1</Text>
                  </View>
                </View>
                <TouchableOpacity style={BACKGROUND_CONTENT} onPress={() => navigation.goBack()}>
                  <View>
                    <View style={EDIT_CONTAINER}>
                      <Text style={TEXT_BOLD}>ชื่อ-นามสกุล</Text>
                      <Icon icon="edit" />
                    </View>
                    <Text style={TITLE_TEXT}>{`${formData.first_name} ${formData.last_name}`}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={BACKGROUND_CONTENT} onPress={() => navigation.goBack()}>
                  <View>
                    <View style={EDIT_CONTAINER}>
                      <Text style={TEXT_BOLD}>ที่อยู่ที่จัดส่ง</Text>
                      <Icon icon="edit" />
                    </View>
                    <Text
                      style={TITLE_TEXT}
                    >{`${formData.address} ${formData.city} ${formData.district} ${formData.sub_district}`}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={BACKGROUND_CONTENT} onPress={() => navigation.goBack()}>
                  <View>
                    <View style={EDIT_CONTAINER}>
                      <Text style={TEXT_BOLD}>ไซส์เสื้อ</Text>
                      <Icon icon="edit" />
                    </View>
                    <Text style={TITLE_TEXT}>
                      {sizeDescription ? sizeDescription.description : ""}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
        <PrimaryButton onPress={() => confirmPurchase()} style={{ marginTop: spacing.large }}>
          <Text>ยืนยันการสั่งซื้อ</Text>
        </PrimaryButton>
      </Screen>
    </View>
  )
}
