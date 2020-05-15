import * as React from "react"
import { TouchableOpacity, ViewStyle } from "react-native"
import LinearGradient from "react-native-linear-gradient"

import { Text } from "../"
import { textPresets } from "./button.presets"
import { ButtonProps } from "./button.props"
import { color } from "../../theme"

const BASE_VIEW: ViewStyle = {
  height: 50,
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",
}

interface PrimaryButtonProps extends ButtonProps {
  containerStyle?: ViewStyle
}

export const PrimaryButton = ({
  tx,
  text,
  children,
  containerStyle,
  style,
  ...rest
}: PrimaryButtonProps) => {
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
        {content}
      </LinearGradient>
    </TouchableOpacity>
  )
}
