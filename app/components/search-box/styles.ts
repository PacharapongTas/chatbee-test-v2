import { ViewStyle, TextStyle, ImageStyle } from "react-native"

import { color, spacing } from "../../theme"

export const INPUT_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.normal,
  height: 45,
  backgroundColor: color.palette.white,
  borderRadius: 10,
}

export const INPUT: ViewStyle = {
  height: "100%",
  paddingLeft: spacing.normal,
  paddingRight: 0,
  paddingVertical: spacing.small,
  flex: 1,
}

export const INPUT_TEXT: TextStyle = {
  fontWeight: "500",
  fontSize: 14,
  lineHeight: 22,
  color: color.darkBackground,
}

export const ICON_CONTAINER: ViewStyle = {
  height: "100%",
  justifyContent: "center",
  paddingHorizontal: spacing.small,
}

export const ICON: ImageStyle = {
  tintColor: color.palette.dustyGrey,
  width: 16,
  height: 16,
  marginHorizontal: spacing.tiny,
}
