import React from "react";
import { View, ViewStyle, TextStyle } from "react-native";
import { Text } from "../text/text";
import { spacing, color } from "../../theme";
import { CHALLENGE_TYPES } from "../../utils/constants";
import { IChallenge, IDelivery, ICoupon } from "../../screens/payment-screen/types";
import NumberFormat from "react-number-format";
import { Payment } from "../../utils/payment";

const SUMMARY_CONTAINER: ViewStyle = {
  backgroundColor: color.darkBackground,
  borderRadius: spacing.smaller,
  marginTop: spacing.smaller,
  padding: spacing.normal,
}

const SUMMARY_TEXT: TextStyle = {
  fontWeight: "600",
  fontSize: 14,
  lineHeight: 34,
}

const SUMMARY_ITEM: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}


interface IProps {
  challenge: IChallenge
  delivery: IDelivery
  coupon?: ICoupon
}

export function OrderPriceSummary({challenge, delivery, coupon}: IProps) {
  return (
            <View style={SUMMARY_CONTAINER}>
              <View style={SUMMARY_ITEM}>
                <Text style={SUMMARY_TEXT}>{CHALLENGE_TYPES[challenge.type.toString()]}</Text>
                <NumberFormat
                  value={challenge.price}
                  displayType="text"
                  decimalScale={2}
                  thousandSeparator
                  suffix=" ฿"
                  renderText={text => (
                    <Text style={{ ...SUMMARY_TEXT, fontWeight: "700" }}>{text}</Text>
                  )}
                />
              </View>
              <View style={SUMMARY_ITEM}>
                <Text style={SUMMARY_TEXT}>ค่าจัดส่ง:</Text>
                {delivery.value ? (
                  <NumberFormat
                    value={delivery.value}
                    displayType="text"
                    decimalScale={2}
                    thousandSeparator
                    suffix=" ฿"
                    renderText={text => (
                      <Text style={{ ...SUMMARY_TEXT, fontWeight: "700" }}>{text}</Text>
                    )}
                  />
                ) : (
                    <Text>Free</Text>
                  )}
              </View>
              {coupon ? <View style={SUMMARY_ITEM}>
                <Text style={SUMMARY_TEXT}>ส่วนลด:</Text>
                <NumberFormat
                  value={coupon.amount}
                  displayType="text"
                  decimalScale={2}
                  thousandSeparator
                  suffix=" ฿"
                  renderText={text => (
                    <Text style={{ ...SUMMARY_TEXT, color: color.activeColor, fontWeight: "700" }}>-{text}</Text>
                  )}
                />
              </View> : null}
              <View style={SUMMARY_ITEM}>
                <Text style={SUMMARY_TEXT}>สรุปรวม:</Text>
                <NumberFormat
                  value={Payment.calculateFinalPrice(challenge, delivery, coupon)}
                  displayType="text"
                  decimalScale={2}
                  thousandSeparator
                  suffix=" ฿"
                  renderText={text => (
                    <Text style={{ ...SUMMARY_TEXT, fontWeight: "700", fontSize: 24 }}>{text}</Text>
                  )}
                />
              </View>
            </View>
  )
}