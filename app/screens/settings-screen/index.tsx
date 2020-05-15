import React from "react"
import { View, ViewStyle, StatusBar, TouchableOpacity, ImageStyle, TextStyle } from "react-native"
import Svg, { Path } from "react-native-svg"
import { StackActions, NavigationActions } from "react-navigation"

import { Screen, Header, Icon, Text } from "../../components"
import { spacing, color } from "../../theme"
import { logout } from "../../services/api"

const FULL: ViewStyle = { flex: 1, backgroundColor: color.palette.surface_main }

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.huge,
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

export const SettingsScreen = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack()
  }
  
  const handleLogout = async () => {
    await logout()
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "AuthLoading" })],
    })
    navigation.dispatch(resetAction)
  }

  const renderItem = ({ iconName, text, showArrow, onPress }) => (
    <TouchableOpacity onPress={onPress} style={ITEM}>
      <Icon icon={iconName} style={ICON} />
      <Text style={TEXT}>{text}</Text>
      {showArrow && (
        <Svg
          width={spacing.small}
          height={spacing.small}
          fill="rgba(255,255,255,0.5)"
          viewBox="0 0 448 512"
          style={{ transform: [{ rotate: "-90deg" }] }}
        >
          <Path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
        </Svg>
      )}
    </TouchableOpacity>
  )

  return (
    <View style={FULL}>
      <StatusBar backgroundColor="transparent" translucent />
      <Header headerText="การตั้งค่า" leftIcon="back" onLeftPress={goBack} />
      <Screen style={CONTAINER} preset="scroll">
        {renderItem({
          iconName: "help",
          text: "คำถามที่พบบ่อย",
          showArrow: true,
          onPress: () => navigation.navigate("WebView", {title: "คำถามที่พบบ่อย", uri: "https://wirtual.co/faq"}),
        })}
        {renderItem({
          iconName: "verified",
          text: "นโยบายของเรา",
          showArrow: true,
          onPress: () => navigation.navigate("Policy"),
        })}
        {renderItem({
          iconName: "fileUpload",
          text: "ออกจากระบบ",
          showArrow: false,
          onPress: handleLogout,
        })}
      </Screen>
    </View>
  )
}
