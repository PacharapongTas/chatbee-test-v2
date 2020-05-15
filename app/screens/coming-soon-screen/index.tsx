import React from "react"
import { Text, View } from "react-native"
import { Screen } from "../../components"
import { CONTAINER, FULL } from "./styles"
import { color } from "../../theme"


export const ComingSoonScreen = () => {

  return (
    <View style={FULL}>
      <Screen preset="scroll" style={CONTAINER}>
        <Text style={{'textAlign': 'center', 'color': 'white',opacity: 0.5, fontSize: 20, marginTop: 20}}>Coming Soon</Text>
      </Screen>
    </View>
  )
}
