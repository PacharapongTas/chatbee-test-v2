import { ViewStyle } from "react-native"
import { color } from "../../theme/color"
import { spacing } from "../../theme"

export const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.cloudBurst,
}

export const SCREEN: ViewStyle = {
  paddingBottom: spacing.medium,
}

export const LINE: ViewStyle = {
  width: "100%",
  height: 1,
  backgroundColor: color.line,
  opacity: 0.2,
}