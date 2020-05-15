import React from "react"
import { Image, View } from "react-native"
import { Icon, Screen, Text } from "../../components"
import { PrimaryButton } from "../../components/button/primary-button"
import { SecondaryButton } from "../../components/button/secondary-button"
import { color } from "../../theme"
import { BUTTON_TEXT, CONTAINER, FULL, ICON, LOGO, PRIMARY_BUTTON, SECONDARY_BUTTON, SUBTITLE, TITLE } from "./styles"


const wirtaulSquareLogo = require("../../assets/logos/wirtual-horizontal-logo.png")

export const SendResultScreen = ({ navigation }) => {
  return (
    <View style={FULL}>
      <Screen style={CONTAINER}>
        <Image source={wirtaulSquareLogo} style={LOGO} />
        <Icon icon="checkCircleGreen" style={ICON} />
        <Text style={TITLE}>การส่งผลวิ่งเสร็จสมบูรณ์</Text>
        <Text style={SUBTITLE}>กรุณารอการยืนยันจากระบบภายใน 24 ชม.</Text>
        <PrimaryButton
          onPress={() => {
            navigation.replace("SendForm")
            navigation.navigate("ChallengeFullDetail", {
              challengeId: navigation.state.params.challengeId,
            })
          }}
          containerStyle={PRIMARY_BUTTON}
        >
          <Text style={BUTTON_TEXT}>ดำเนินการต่อ ></Text>
        </PrimaryButton>
        <SecondaryButton
          onPress={() => navigation.navigate("SendHistory")}
          backgroundColor={color.darkBackground2}
          containerStyle={SECONDARY_BUTTON}
        >
          <Text style={BUTTON_TEXT}>ดูประวัติการส่งผลวิ่ง</Text>
        </SecondaryButton>
      </Screen>
    </View>
  )
}
