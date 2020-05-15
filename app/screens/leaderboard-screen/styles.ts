import { ViewStyle, TextStyle, ImageStyle } from "react-native"

import { spacing, color } from "../../theme"

export const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.dualBlue,
}

export const CONTAINER: ViewStyle = {
  padding: spacing.medium,
}

export const RANK_CARD: ViewStyle = {
  padding: spacing.normal,
  borderRadius: 8,
  backgroundColor: color.palette.bigStone,
  width: "100%",
  flexDirection: "row",
  marginTop: spacing.small,
  borderWidth: 2,
  borderColor: color.palette.bigStone,
}

export const TEXT_HEADER: TextStyle = {
  fontWeight: "700",
  fontSize: 14,
  marginLeft: spacing.small,
}

export const TEXT_TITLE: TextStyle = {
  fontWeight: "700",
  fontSize: 14,
  height: 20,
}

export const TEXT_NUMBER: TextStyle = {
  fontWeight: "600",
  fontSize: 16,
  alignSelf: "center",
}

export const TEXT_SUB_TITLE: TextStyle = {
  fontWeight: "500",
  fontSize: 12,
  lineHeight: 19,
  opacity: 0.5,
}

export const RANK_NUMBER_COLUMN: TextStyle = {
  width: "8%",
  justifyContent: "center",
  alignItems: "flex-end",
}

export const NAME_COLUMN: TextStyle = {
  flex: 1,
}

export const DISTANCE_COLUMN: TextStyle = {
  width: "30%",
  alignItems: "flex-end",
}

export const NUMBER_ICON: ImageStyle = {
  width: 18,
  height: 18,
}
