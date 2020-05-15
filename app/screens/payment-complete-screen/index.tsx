import React, { useEffect, useState, Fragment } from "react"
import { NavigationInjectedProps } from "react-navigation"
import { View, Image } from "react-native"
import { Screen, Icon, Text } from "../../components"
import { spacing } from "../../theme";

import { FULL, CONTAINER, LOGO, ICON, TITLE, SUBTITLE, PRIMARY_BUTTON, BUTTON_TEXT } from "./styles"
import { PrimaryButton } from "../../components/button/primary-button"
import { payCaptureComplete } from "../../services/api"

const wirtaulSquareLogo = require("../../assets/logos/wirtual-horizontal-logo.png")

interface IProps extends NavigationInjectedProps<{}> {}

const PAYMENT_STATUS = {
  COMPLETE: "COMPLETE",
  FAIL: "FAIL",
}

export const PaymentCompleteScreen: React.FunctionComponent<IProps> = ({ navigation }) => {
  const [state, setState] = useState({
    challenge: undefined,
    map: undefined,
    loading: true,
  })

  const [payment, setPayment] = useState({
    payment_status: undefined,
    payment_detail: undefined,
  })

  useEffect(() => {
    //@ts-ignore
    const { capture_id, challenge, map } = navigation.state.params
    
    // if no capture_id, it means that user pay by uploading bank transfer
    if (!capture_id) {
      setState({
        ...state,
        loading: false,
      })
      setPayment({
        payment_detail: "ขอบคุณที่ร่วมเป็นส่วนหนึ่งกับเรา",
        payment_status: PAYMENT_STATUS.COMPLETE,
      })
      return
    }

    payCaptureComplete(capture_id, {})
      .then(() =>
        setPayment({
          payment_detail: "ขอบคุณที่ร่วมเป็นส่วนหนึ่งกับเรา",
          payment_status: PAYMENT_STATUS.COMPLETE,
        }),
      )
      .catch(error =>
        setPayment({
          payment_detail: error[Object.keys(error)[0]],
          payment_status: PAYMENT_STATUS.FAIL,
        }),
      )
      .finally(() => setState({ challenge, map, loading: false }))
  }, [])

  const checkNavigate = () => {
    //@ts-ignore
    const { capture_id, challenge, map } = navigation.state.params
    if (payment.payment_status === PAYMENT_STATUS.COMPLETE) {
      // @ts-ignore
      navigation.popToTop()

      if (capture_id) {
        return navigation.navigate("ChallengeFullDetail", {
          challenge,
          map: state.map,
        })  
      } else {
        return navigation.navigate("ChallengeDetail", {
          challengeId: challenge.id,
        })
      }
      
    } else {
      //@ts-ignore
      return navigation.goBack()
    }
  }

  return (
    <View testID="PaymentCompleteScreen" style={FULL}>
      <Screen preset="scroll" loading={state.loading} style={CONTAINER}>
        <Image source={wirtaulSquareLogo} style={LOGO} />
        {payment.payment_status === PAYMENT_STATUS.COMPLETE ? (
          <Fragment>
            <Icon icon="checkCircleGreen" style={ICON} />
            <Text style={TITLE}>การชำระเงินเสร็จสมบูรณ์</Text>
          </Fragment>
        ) : (
          <Fragment>
            <Icon icon="checkCircleRed" style={ICON} />
            <Text style={TITLE}>การชำระเงินล้มเหลว</Text>
          </Fragment>
        )}
        {payment.payment_status === PAYMENT_STATUS.COMPLETE ? (
          <Fragment>
            <Text style={SUBTITLE}>{payment.payment_detail}</Text>
            <Text style={SUBTITLE}>กรุณารอยืนยันการชำระเงินภายใน 24 ชั่วโมง</Text>
          </Fragment>
        ) : (
          <Text style={SUBTITLE}>{payment.payment_detail}</Text>
        )}
        <PrimaryButton onPress={() => checkNavigate()} containerStyle={PRIMARY_BUTTON} style={{marginBottom: spacing.small}}>
          <Text style={BUTTON_TEXT}>ชาเลนจ์ ></Text>
        </PrimaryButton>
      </Screen>
    </View>
  )
}
