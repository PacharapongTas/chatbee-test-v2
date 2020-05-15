import { ViewStyle, TextStyle } from "react-native"

import { spacing, color } from "../../theme"

export const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.surface_main,
}

export const CONTAINER: ViewStyle = {
  padding: spacing.medium,
}

export const TITLE: TextStyle = {
  fontWeight: "600",
  fontSize: 16,
  lineHeight: 26,
}

export const HORIZONTAL_DIVIDER: ViewStyle = {
  width: "100%",
  height: 1,
  borderBottomColor: color.line,
  borderBottomWidth: 1,
  opacity: 0.2,
}

export const VERTICAL_DIVIDER: ViewStyle = {
  width: 1,
  height: "100%",
  borderRightColor: color.line,
  borderRightWidth: 1,
  opacity: 0.2,
}

export const FLEX_CONTAINER: ViewStyle = {
  flexDirection: "row",
}

export const FLEX_ITEM: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.normal,
  alignItems: "center",
}

export const FLEX_TITLE: TextStyle = {
  fontWeight: "700",
  fontSize: 16,
  lineHeight: 19,
}

export const FLEX_SUBTITLE: TextStyle = {
  fontWeight: "300",
  fontSize: 10,
  lineHeight: 28,
  opacity: 0.5,
}

export const BUTTON: ViewStyle = {
  marginVertical: spacing.large,
}

export const BUTTON_TEXT: TextStyle = {
  fontWeight: "600",
  fontSize: 15,
}
