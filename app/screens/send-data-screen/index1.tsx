import React, { useState, useEffect } from "react"
import { View } from "react-native"

import { FULL, CONTAINER } from "./styles"
import { Screen } from "../../components"
import FormScreen from "./form"

export const SendDataScreen1 = ({ navigation }) => {
  const [state, setState] = useState({
    previewImageUrl: "",
    previewTitle: "",
    challenge_id: "",
    picture_ids: [],
    distance: 0,
    time: "",
  })

  useEffect(() => {
    const challenge = navigation.getParam("challenge")
    if (challenge) {
      setState({ ...state, challenge_id: challenge.id })
    }
  }, [])

  return (
    <View style={FULL}>
      <Screen preset="scroll" style={CONTAINER}>
        <FormScreen state={state} setState={setState} navigation={navigation} />
      </Screen>
    </View>
  )
}
