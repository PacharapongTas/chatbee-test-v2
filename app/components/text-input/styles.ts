import { ViewStyle, TextStyle } from "react-native"

import { color, spacing } from "../../theme"

export const LABEL_CONTAINER: ViewStyle = {
  marginTop: 8,
  width: "100%",
}

export const LABEL_TEXT: TextStyle = {
  fontWeight: "700",
  fontSize: 12,
}

export const INPUT_CONTAINER: ViewStyle = {
  flexDirection: "row",
}

export const INPUT = ({ disabled, error }): ViewStyle => ({
  marginTop: spacing.tiny,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  height: 45,
  backgroundColor: disabled ? color.darkBackground : color.palette.white,
  paddingLeft: spacing.normal,
  paddingRight: 0,
  paddingVertical: spacing.small,
  flex: 1,
  borderWidth: error ? 2 : 2,
  borderRightWidth: 0,
  borderTopColor: color.palette.surface_main,
  borderLeftColor: color.palette.surface_main,
  borderRightColor: color.palette.surface_main,
  borderColor: error ? color.error : color.palette.surface_dark,
})

export const INPUT_TEXT = ({ disabled }): TextStyle => ({
  fontWeight: "500",
  fontSize: 14,
  color: disabled ? color.palette.white : color.darkBackground,
})

export const SUFFIX_CONTAINER = ({ disabled, error }): ViewStyle => ({
  marginTop: spacing.tiny,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  height: 45,
  backgroundColor: disabled ? color.darkBackground : color.palette.white,
  justifyContent: "center",
  paddingHorizontal: spacing.normal,
  borderWidth: error ? 2 : 2,
  borderLeftWidth: 0,
  borderRightColor: color.palette.surface_main,
  borderTopColor: color.palette.surface_main,
  borderColor: error ? color.error : color.palette.surface_dark,
})
