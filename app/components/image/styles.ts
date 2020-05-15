import { ViewStyle, TextStyle, ImageStyle } from "react-native"

import { spacing, color } from "../../theme"

export const LABEL_CONTAINER: ViewStyle = {
  marginTop: 8,
  marginLeft: 16,
}

export const LABEL_TEXT: TextStyle = {
  fontWeight: "700",
  fontSize: 12,
  lineHeight: 19,
}

export const IMAGE_CONTAINER: ViewStyle = {
  marginTop: spacing.tiny,
  height: 130,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
}

export const DASH_BORDER: ViewStyle = {
  borderRadius: 10,
  borderWidth: 1,
  borderStyle: "dashed",
  borderColor: color.inActiveColor,
}

export const IMAGE: ImageStyle = {
  width: "100%",
  height: "100%",
  borderRadius: 10,
}

export const TEXT: TextStyle = {
  fontWeight: "300",
  fontSize: 14,
  lineHeight: 21,
  marginLeft: 8,
}
