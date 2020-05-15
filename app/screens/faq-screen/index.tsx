import WebView, { WebViewNavigation } from "react-native-webview"
import React, { useState, Fragment } from "react"
import { View, ViewStyle, TouchableOpacity, Image, TextStyle, ImageStyle } from "react-native"
import Collapsible from "react-native-collapsible"
import { Svg, Path } from "react-native-svg"

import { Text, Header, Screen } from "../../components"
import { spacing, color } from "../../theme"

const FULL: ViewStyle = {
  flex: 1,
}

const SCREEN: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.large,
}

const TOUCH_CONTAINER: any = expanded => ({
  paddingVertical: spacing.small,
  paddingHorizontal: spacing.medium,
  height: 45,
  borderRadius: 10,
  backgroundColor: color.darkBackground,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottomLeftRadius: expanded ? 0 : 10,
  borderBottomRightRadius: expanded ? 0 : 10,
  marginTop: spacing.smaller,
})

const COLLAPIBLE_CONTAINER: ViewStyle = {
  backgroundColor: color.darkBackground,
  paddingHorizontal: spacing.medium,
  paddingBottom: spacing.normal,
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
}

const COLLAPIBLE_TITLE: TextStyle = {
  fontWeight: "500",
  fontSize: 14,
}

const LINE: ViewStyle = {
  width: "100%",
  height: 1,
  backgroundColor: color.line,
  opacity: 0.2,
}

const TOPIC_TEXT: TextStyle = {
  fontWeight: "300",
  fontSize: 12,
  marginTop: spacing.small,
}

const TEXT: TextStyle = {
  fontWeight: "300",
  fontSize: 10,
  marginTop: spacing.small,
}

const IMAGE: ImageStyle = {
  alignSelf: "center",
  marginTop: spacing.smaller,
}

const ITEM_CONTAINER: ViewStyle = {
  marginHorizontal: spacing.large,
  marginTop: spacing.tiny,
  marginBottom: spacing.medium,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
}

const ITEM: ViewStyle = {
  width: 100,
}

export const FAQScreen = ({ navigation }) => {
  const [expandedName, setExpandedName] = useState("")

  const goBack = () => navigation.goBack()

  const CaretArrow = ({ upsideDown }) => (
    <Svg
      width="15"
      height="15"
      fill="rgba(255,255,255,0.5)"
      viewBox="0 0 448 512"
      style={upsideDown && { transform: [{ rotate: "180deg" }] }}
    >
      <Path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
    </Svg>
  )

  const CollapsibleCard = ({ id, title, children }) => (
    <Fragment>
      <TouchableOpacity
        onPress={() => setExpandedName(expandedName === id ? "" : id)}
        style={TOUCH_CONTAINER(expandedName === id)}
      >
        <Text style={COLLAPIBLE_TITLE}>{title}</Text>
        <CaretArrow upsideDown={expandedName === id} />
      </TouchableOpacity>
      <Collapsible collapsed={expandedName !== id} style={COLLAPIBLE_CONTAINER}>
        <View style={LINE} />
        {children}
      </Collapsible>
    </Fragment>
  )

  const Item = ({ text, imageSrc }) => (
    <View style={ITEM}>
      <Text style={TEXT}>{text}</Text>
      <Image source={imageSrc} style={IMAGE} />
    </View>
  )

  return (
    <View style={FULL}>
      <Header headerText="คำถามที่พบบ่อย" leftIcon="back" onLeftPress={goBack} />
      <Screen preset="scroll" backgroundColor={color.darkBackground2} style={SCREEN}>
      <WebView
          source={{ uri: 'https://wirtual.co/faq' }}
        />
      </Screen>
    </View>
  )
}
