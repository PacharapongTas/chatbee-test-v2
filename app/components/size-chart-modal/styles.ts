import { ViewStyle } from "react-native"

import { color, spacing } from "../../theme"

export const BACKGROUND: ViewStyle = {
  backgroundColor: "rgba(0,0,0,0.5)",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const CONTAINER: ViewStyle = {
  backgroundColor: color.darkBackground,
  position: "relative",
  borderRadius: 10,
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
}

export const CLOSE_CONTAINER: ViewStyle = {
  position: "absolute",
  top: -10,
  right: -10,
}
