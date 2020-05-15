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

export const PICKER_CONTAINER = ({ error }): ViewStyle => ({
  marginTop: spacing.tiny,
  borderRadius: 10,
  backgroundColor: color.palette.white,
  width: "100%",
  borderWidth: error ? 2 : 0,
  borderColor: color.error,
})

export const PICKER_VIEW_IOS: ViewStyle & TextStyle = {
  paddingHorizontal: spacing.normal,
  paddingVertical: spacing.small,
  height: 45,

  color: color.placeHolderColor,
}

export const PICKER_VIEW_ANDROID: ViewStyle & TextStyle = {
  paddingHorizontal: spacing.normal,
  paddingVertical: spacing.small,
  height: 45,

  color: color.placeHolderColor,
}

export const PCIKER_PLACEHOLDER: TextStyle = {
  fontWeight: "500",
  fontSize: 14,
  color: color.placeHolderColor,
  opacity: 0.45,
}
