import { ViewStyle, TextStyle, ImageStyle } from "react-native"

import { spacing, color } from "../../theme"

export const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.surface_main
}

export const CONTAINER: ViewStyle = {
  padding: spacing.medium,
  alignItems: "center",
  backgroundColor: color.darkBackground2,
}

export const LOGO: ImageStyle = {
  marginTop: 52,
  resizeMode: "contain",
  width: 110,
}

export const ICON: ImageStyle = {
  marginTop: spacing.large * 2,
}

export const TITLE: TextStyle = {
  fontWeight: "700",
  fontSize: 24,
  lineHeight: 37,
  marginTop: spacing.huge,
}

export const SUBTITLE: TextStyle = {
  fontSize: 14,
  lineHeight: 22,
  opacity: 0.85,
  marginTop: spacing.tiny,
}

export const PRIMARY_BUTTON: ViewStyle = {
  marginTop: spacing.huge,
  width: "100%",
}

export const SECONDARY_BUTTON: ViewStyle = {
  marginTop: spacing.small,
  width: "100%",
}

export const BUTTON_TEXT: TextStyle = {
  fontWeight: "600",
  fontSize: 15,
}
