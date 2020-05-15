import { ViewStyle, TextStyle, ImageStyle } from "react-native"

import { color, spacing } from "../../theme"

export const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
}

export const SCREEN: ViewStyle = {
  height: "100%",
}

export const IMAGE_CONTAINER: ViewStyle = {
}

export const IMAGE: ImageStyle = {
  width: '65%',
  resizeMode: 'contain'
}

export const FOOTER: ViewStyle = {
  paddingBottom: spacing.massive + spacing.small,
  paddingHorizontal: spacing.medium,
}

export const ICON: ViewStyle = {
  marginRight: spacing.normal,
}

export const BUTTON: ViewStyle = {
  display: "flex",
  flexDirection: "row",
}

export const BUTTON_TEXT: TextStyle = {
  fontWeight: "600",
  fontSize: 15,
}

export const TEXT: TextStyle = {
  fontSize: 12,
  opacity: 0.7,
  textAlign: "center",
  marginTop: spacing.normal,
}
