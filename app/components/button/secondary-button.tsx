import React from "react"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"

import { Text } from "../"
import { textPresets } from "./button.presets"
import { color } from "../../theme"

const BASE_VIEW: ViewStyle = {
  height: 50,
  padding: 2,
  borderRadius: 25,
}

const INNER_VIEW: ViewStyle = {
  width: "100%",
  height: "100%",
  borderRadius: 25,
  backgroundColor: "transparent",
  justifyContent: "center",
  alignItems: "center",
}

export const SecondaryButton = ({
  tx,
  text,
  children,
  containerStyle,
  style,
  backgroundColor,
  ...rest
}: any) => {
  const content = children || <Text tx={tx} text={text} style={textPresets.primary} />

  return (
    <TouchableOpacity style={containerStyle} {...rest}>
      <LinearGradient
        colors={
          rest.disabled
            ? [color.disabled, color.disabled]
            : [color.palette.purple, color.palette.lipstick]
        }
        style={{ ...BASE_VIEW, ...style }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={{ ...INNER_VIEW, backgroundColor: backgroundColor }}>{content}</View>
      </LinearGradient>
    </TouchableOpacity>
  )
}
