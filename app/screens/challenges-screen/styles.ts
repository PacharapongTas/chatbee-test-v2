import { ViewStyle, TextStyle, ImageStyle } from "react-native"

import { spacing, color } from "../../theme"

export const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.cloudBurst,
}

export const EVENT_CONTAINER: ViewStyle = {
  padding: spacing.medium,
}

export const EVENT_TITLE: TextStyle = {
  fontWeight: "600",
  fontSize: 16,
  lineHeight: 26,
}

export const EVENT_DESCRIPTION: TextStyle = {
  marginTop: spacing.smaller,
  fontWeight: "300",
  fontSize: 12,
  lineHeight: 20,
  opacity: 0.7,
}

export const DIVIDER: ViewStyle = {
  width: "100%",
  height: 1,
  borderBottomColor: color.line,
  borderBottomWidth: 1,
  opacity: 0.2,
}

export const CHALLENGE_CONTAINER: ViewStyle = {
  display: "flex",
  flexDirection: "row",
  paddingVertical: spacing.normal,
  paddingHorizontal: spacing.medium,
}

export const CHALLENGE_IMAGE: ImageStyle = {
  width: 100,
  height: 80,
  borderRadius: spacing.tiny,
  resizeMode: "contain",
}

export const CHALLENGE_CONTENT: ViewStyle = {
  marginLeft: spacing.medium,
}

export const CHALLENGE_TITLE: TextStyle = {
  fontWeight: "700",
  fontSize: 16,
  lineHeight: 26,
}

export const CHALLENGE_DISTANCE: TextStyle = {
  fontWeight: "500",
  fontSize: 13,
  lineHeight: 20,
  opacity: 0.75,
}

export const CHALLENGE_PRICE: TextStyle = {
  marginTop: spacing.tiny,
  fontWeight: "700",
  fontSize: 14,
  lineHeight: 22,
  color: color.activeColor,
}
