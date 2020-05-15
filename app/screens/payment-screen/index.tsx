import React, { Fragment, useEffect, useState } from "react"
import { ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { NavigationInjectedProps } from "react-navigation"
import NumberFormat from "react-number-format"
import { Header, Icon, Map, Screen, Text, TextInput } from "../../components"
import { PrimaryButton } from "../../components/button/primary-button"
import { IMapProps } from "../../components/map/map.props"
import { useNotificationBarContext } from "../../GlobalContext"
import { fetchCoupon, fetchDeliveries } from "../../services/api"
import { color, spacing } from "../../theme"
import { CHALLENGE_TYPES } from "../../utils/constants"
import { IChallenge, ICoupon, IDelivery } from "./types"
import { OrderPriceSummary } from '../../components/order-price-summary';


const FULL: ViewStyle = { flex: 1 }

const SCREEN: ViewStyle = {
  paddingVertical: spacing.large,
  paddingHorizontal: spacing.medium,
}

const CARD_CONTAINER: ViewStyle = {
  backgroundColor: color.darkBackground,
  padding: spacing.medium,
  borderRadius: 8,
}

const TITLE_TEXT: TextStyle = {
  fontWeight: "600",
  fontSize: 16,
  lineHeight: 26,
}

const TEXT_CONTAINER: ViewStyle = {
  marginTop: spacing.smaller,
}

const TEXT: TextStyle = {
  fontWeight: "300",
  fontSize: 12,
  lineHeight: 20,
  opacity: 0.7,
}

const LABEL_CONTAINER: ViewStyle = {
  marginTop: spacing.normal,
}

const LABEL_TEXT: TextStyle = {
  fontWeight: "700",
  fontSize: 12,
  lineHeight: 19,
  marginTop: 8,
}

const DELIVERY_CONTAINER: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
}

const DELIVERY_ITEM: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color.darkBackground,
  borderRadius: spacing.smaller,
  marginTop: spacing.smaller,
  width: "48.5%",
  paddingVertical: spacing.normal,
}

const DELIVERY_TITLE: TextStyle = {
  fontWeight: "600",
  fontSize: 16,
  lineHeight: 26,
  marginTop: spacing.smaller,
}

const DELIVERY_SUBTITLE: TextStyle = {
  fontWeight: "300",
  fontSize: 12,
  lineHeight: 20,
}

const PROMOTION_CODE_TOUCHABLLE: ViewStyle = {
  marginTop: spacing.normal, display: 'flex', flexDirection: 'row', alignItems: 'center'
}

const PROMOTION_CODE_ICON: ImageStyle = {
  height: 15, 
  marginRight: spacing.smaller
}

const PROMOTION_CODE_LABEL: TextStyle = {
  fontWeight: '500', fontSize: 12, textDecorationLine: 'underline',
}

const PROMOTION_CODE_CONTAINER: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: "space-between",
}

const PROMOTION_INPUT_CONTAINER: ViewStyle = {
  position: 'relative',
  width: '70%',
  marginRight: spacing.small
}


const PROMOTION_BUTTON_CONTAINER: ViewStyle = { width: '30%' }

const CHECK_ICON_CONTAINER: ViewStyle = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: spacing.small,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
}


interface IProps extends NavigationInjectedProps<{}> {
  challenge: IChallenge
}

interface IState {
  challenge: any;
  map: IMapProps | null;
  deliveries: IDelivery[];
  promoCode: string;
  selectedDeliveryIndex: number;
  coupon: ICoupon | null;
  showCouponInput: boolean;
  loading: boolean;
}

export const PaymentScreen: React.FunctionComponent<IProps> = ({ navigation }) => {
  const [_, setNotificationBar] = useNotificationBarContext()
  const [state, setState] = useState<IState>({
    challenge: undefined,
    map: null,
    deliveries: [],
    promoCode: '',
    coupon: null,
    showCouponInput: false,
    selectedDeliveryIndex: 0,
    loading: true,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // @ts-ignore
    const { challenge, map } = navigation.state.params
    const deliveries = await fetchDeliveries()
    setState({
      ...state,
      challenge,
      map,
      deliveries,
      loading: false,
    })
  }

  const fetchPromotionCode = async () => {
    try {
      const result = await fetchCoupon(state.challenge.id,state.promoCode)
      setState({
        ...state,
        coupon: result
      });

      setNotificationBar('ยินดีด้วย คุณได้รับส่วนลด', 'success', true)
    } catch (error) {
      setState({
        ...state,
        coupon: null
      });
      setNotificationBar('การใช้ส่วนลดไม่สำเร็จ', 'warning', true)
    }
  }

  const goToPreviousScreen = () => navigation.goBack()

  const renderDeliveryCard = ({ key, label, price }) => (
    <TouchableOpacity
      key={key}
      style={DELIVERY_ITEM}
      disabled={key === state.selectedDeliveryIndex}
      onPress={() => setState({ ...state, selectedDeliveryIndex: key })}
    >
      {key === state.selectedDeliveryIndex ? <Icon icon="radio" /> : <Icon icon="emptyRadio" />}
      <Text style={DELIVERY_TITLE}>{label}</Text>
      {price ? (
        <NumberFormat
          value={price}
          displayType="text"
          decimalScale={0}
          thousandSeparator
          prefix="+"
          suffix=" บาท"
          renderText={text => <Text style={DELIVERY_SUBTITLE}>{text}</Text>}
        />
      ) : (
          <Text style={DELIVERY_SUBTITLE}>Free</Text>
        )}
    </TouchableOpacity>
  )

  return (
    <View style={FULL}>
      <Header headerText="รายการสั่งซื้อ" leftIcon="back" onLeftPress={goToPreviousScreen} />
      <Screen
        style={SCREEN}
        preset="scroll"
        backgroundColor={color.palette.cloudBurst}
        loading={state.loading}
      >
        {state.challenge && state.map ? (
          <Fragment>
            <View style={CARD_CONTAINER}>
              <Map event={state.challenge.event} {...state.map} />
              <Text style={TITLE_TEXT}>{CHALLENGE_TYPES[state.challenge.type.toString()]}</Text>
              <NumberFormat
                value={state.challenge.price}
                displayType="text"
                decimalScale={0}
                thousandSeparator
                suffix=" ฿"
                renderText={text => <Text style={TITLE_TEXT}>{text}</Text>}
              />
              <View style={TEXT_CONTAINER}>
                <Text style={TEXT}>
                  {`ประเภท: ${CHALLENGE_TYPES[state.challenge.type.toString()]} `}
                  <NumberFormat
                    value={state.challenge.distance / 1000}
                    displayType="text"
                    decimalScale={0}
                    thousandSeparator
                    suffix=" km"
                    renderText={text => <Text style={TEXT}>{text}</Text>}
                  />
                </Text>
                <Text style={TEXT}>จำนวน: 1</Text>
              </View>
            </View>
            <View style={LABEL_CONTAINER}>
              <Text style={LABEL_TEXT}>เลือกวิธีการจัดส่ง</Text>
            </View>
            <View style={DELIVERY_CONTAINER}>
              {state.deliveries.map((delivery, index) =>
                renderDeliveryCard({ key: index, label: delivery.type, price: delivery.value }),
              )}
            </View>
            {!state.showCouponInput ?             <TouchableOpacity 
            style={PROMOTION_CODE_TOUCHABLLE}
            onPress={() => setState({...state, showCouponInput: true})}>
            <Icon icon="promotionCode" style={PROMOTION_CODE_ICON} />
            <Text style={PROMOTION_CODE_LABEL}>Promotion Code</Text>
            </TouchableOpacity> : <View>
              <Text style={LABEL_TEXT}>กรอก Promotion Code</Text>
              <View style={PROMOTION_CODE_CONTAINER}>
                <View style={PROMOTION_INPUT_CONTAINER}>
                  <TextInput
                    // @ts-ignore
                    value={state.promoCode}
                    onChangeText={text => setState({ ...state, promoCode: text })} />
                         {state.coupon ?  <View  style={CHECK_ICON_CONTAINER}>
                <Icon icon="checkCircleGreen" style={{ width: 20, height: 20}} />
                </View> : null}
                </View>
                <View style={PROMOTION_BUTTON_CONTAINER}>
                  <PrimaryButton onPress={fetchPromotionCode} ><Text>ยืนยัน</Text></PrimaryButton>
                </View>
              </View>
            </View>}
            <View style={LABEL_CONTAINER}>
              <Text style={LABEL_TEXT}>สรุปรายการสั่งซื้อ</Text>
            </View>
            <OrderPriceSummary challenge={state.challenge} delivery={state.deliveries[state.selectedDeliveryIndex]} coupon={state.coupon} />
            <PrimaryButton
              style={LABEL_CONTAINER}
              onPress={() =>
                navigation.navigate("PaymentForm", {
                  challenge: state.challenge,
                  map: state.map,
                  delivery: state.deliveries[state.selectedDeliveryIndex],
                  coupon: state.coupon ? state.coupon : null,
                })
              }
            >
              <Text>ดำเนินการต่อ</Text>
            </PrimaryButton>
          </Fragment>
        ) : null}
      </Screen>
    </View>
  )
}
