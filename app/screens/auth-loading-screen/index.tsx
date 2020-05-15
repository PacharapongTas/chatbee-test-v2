import React, { useEffect } from "react"
import { View } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"

import { CONTAINER } from "./styles"
import { Screen } from "../../components"
import { logout, getMe, KEY_TOKEN } from "../../services/api"
import { color } from "../../theme"

export const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    bootstrapAsync()
  }, [])

  const bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem(KEY_TOKEN)

    if (token) {
      const today = new Date().getTime()
      const expTime = Number(new Date(Number(await AsyncStorage.getItem("expTime"))))
      if (today < expTime) {
        try {
          const userData = await getMe()
          await AsyncStorage.setItem("userData", JSON.stringify(userData))
          return navigation.replace("App") 
        } catch (error) {
        }
      }
      await logout()
    }
    return navigation.replace("Auth")
  }

  return (
    <View style={CONTAINER}>
      <Screen backgroundColor={color.palette.surface_main} />
    </View>
  )
}
