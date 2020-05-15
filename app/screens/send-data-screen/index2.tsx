import React from "react"
import { View } from "react-native"

import { FULL, CONTAINER } from "./styles"
import { Screen } from "../../components"
import ConfirmScreen from "./confirm"

export const SendDataScreen2 = ({ navigation }) => {
  return (
    <View style={FULL}>
      <Screen preset="scroll" style={CONTAINER}>
        <ConfirmScreen navigation={navigation} />
      </Screen>
    </View>
  )
}
