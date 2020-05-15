import { ViewStyle, TextStyle } from "react-native"

import { spacing, color } from "../../theme"

// tabs screen
export const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.surface_main
}

export const CONTAINER: ViewStyle = {
  padding: spacing.medium,
}

// form screen
export const CONFIRM_BUTTON: ViewStyle = {
  marginVertical: spacing.large,
}

// confirm screen
export const DATE_CONTAINER: ViewStyle = {
  marginVertical: spacing.medium,
  paddingVertical: spacing.normal,
  width: "100%",
  height: 60,
  backgroundColor: color.darkBackground,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
}

export const DATE_LABEL: TextStyle = {
  fontWeight: "500",
  fontSize: 12,
  opacity: 0.6,
}

export const DATE_TEXT: TextStyle = {
  fontWeight: "700",
  fontSize: 14,
  marginLeft: spacing.normal,
}

export const DATE_SPACER: ViewStyle = {
  width: spacing.large,
}
