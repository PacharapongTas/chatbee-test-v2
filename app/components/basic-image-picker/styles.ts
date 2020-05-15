import { ViewStyle, TextStyle, ImageStyle } from "react-native"

import { color, spacing } from "../../theme"

export const LABEL_CONTAINER: ViewStyle = {
  marginTop: 8,
  marginLeft: 16,
}

export const LABEL_TEXT: TextStyle = {
  fontWeight: "700",
  fontSize: 12,
  lineHeight: 19,
}

export const IMAGE_PICKER_CONTAINER: ViewStyle = {
  marginTop: spacing.tiny,
  height: 150,
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "row",
}

export const PICKER_CONTAINER: ViewStyle = {
  marginTop: spacing.tiny,
  height: 45,
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

export const LOADING: ViewStyle = {
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1,
  position: "absolute",
}

export const IMAGE: ImageStyle = {
  position: 'absolute',
  width: "100%",
  height: "100%",
  borderRadius: 10,
}

export const MODAL_IMAGE: ImageStyle = {
  width: 300,
  height: '100%',
  resizeMode: 'contain'
}

export const PICKER_TEXT: TextStyle = {
  fontWeight: "300",
  fontSize: 14,
  lineHeight: 21,
  marginLeft: 8,
}
