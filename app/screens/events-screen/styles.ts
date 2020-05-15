import { ViewStyle, TextStyle, ImageStyle } from "react-native"

import { spacing, color } from "../../theme"

export const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.surface_main
}

export const EVENT_CONTAINER: ViewStyle = {
  padding: spacing.medium,
}

export const EVENT_TITLE: TextStyle = {
  fontWeight: "600",
  fontSize: 16,
  lineHeight: 26,
  color: color.text,
}

export const EVENT_DESCRIPTION: TextStyle = {
  marginTop: spacing.smaller,
  fontWeight: "300",
  fontSize: 12,
  lineHeight: 20,
  color: color.text,
  opacity: 0.7,
}

export const DIVIDER: ViewStyle = {
  width: "100%",
  height: 1,
  borderBottomColor: color.line,
  borderBottomWidth: 1,
  opacity: 0.2,
}

export const EVENT_CARD_CONTAINER: ViewStyle = {
  width: "100%",
  aspectRatio: 16/9
}

export const EVENT_CARD_IMAGE: ImageStyle = {
  width: "100%",
  height: "100%",
  position: "absolute",
  opacity: 0.5,
}

export const EVENT_CARD_CONTENT: ViewStyle = {
  paddingVertical: spacing.large,
  paddingHorizontal: spacing.medium,
  flex: 1,
  justifyContent: "flex-end",
}

export const EVENT_CARD_TITLE: TextStyle = {
  fontWeight: "700",
  fontSize: 16,
  lineHeight: 24,
  color: color.text,
}

export const EVENT_CARD_SUBTITLE: TextStyle = {
  fontWeight: "300",
  fontSize: 14,
  lineHeight: 24,
  color: color.text,
  opacity: 0.75,
}
