import { ViewStyle, TextStyle, ImageStyle } from "react-native"

import { spacing, color } from "../../theme"

export const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.cloudBurst,
}

export const SCREEN: ViewStyle = {
  paddingBottom: spacing.normal * 5,
}

export const CONTAINER: ViewStyle = {
  padding: spacing.medium,
}

export const TITLE: TextStyle = {
  fontWeight: "600",
  fontSize: 16,
  lineHeight: 26,
}

export const IMAGE: ImageStyle = {
  marginTop: spacing.medium,
  width: "100%",
  height: 150,
}

export const HORIZONTAL_DIVIDER: ViewStyle = {
  width: "100%",
  height: 1,
  borderBottomColor: color.line,
  borderBottomWidth: 1,
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
  fontSize: 12,
  lineHeight: 28,
  opacity: 0.5,
}

export const SUBTITLE: TextStyle = {
  fontWeight: "300",
  fontSize: 12,
  lineHeight: 20,
  opacity: 0.7,
}

export const SPACER: ViewStyle = {
  marginTop: spacing.normal,
  marginRight: spacing.normal,
}

export const REWARD_CONTAINER: ViewStyle = {
  marginTop: spacing.smaller,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
}

export const REWARD_CARD: ViewStyle = {
  marginTop: spacing.smaller,
  width: "48.5%",
  alignItems: "center",
  borderRadius: spacing.smaller,
  backgroundColor: color.darkBackground,
  paddingVertical: spacing.medium,
  paddingHorizontal: spacing.medium,
}

export const REWARD_IMAGE: ImageStyle = {
  height: 100,
  width: 100,
}

export const REWARD_TITLE: TextStyle = {
  marginTop: spacing.tiny,
  textAlign: 'center',
  fontWeight: "700",
  fontSize: 12,
  lineHeight: 19,
}

export const REWARD_SUBTITLE: TextStyle = {
  fontWeight: "300",
  fontSize: 10,
  lineHeight: 28,
  opacity: 0.5,
}

export const BUTTON: ViewStyle = {
  position: "absolute",
  bottom: 0,
  left: spacing.medium,
  right: spacing.medium,
  marginVertical: spacing.large,
}

export const BUTTON_TEXT: TextStyle = {
  fontWeight: "600",
  fontSize: 15,
}
