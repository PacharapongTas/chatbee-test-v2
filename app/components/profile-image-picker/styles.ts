import { ViewStyle, ImageStyle } from "react-native"

import { color } from "../../theme"

export const IMAGE_CONTAINER: ViewStyle = {
  position: "relative",
  width: 90,
  height: 90,
  borderRadius: 45,
  backgroundColor: color.darkBackground,
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
  width: "100%",
  height: "100%",
  borderRadius: 45,
  position: "absolute",
}

export const ICON: ImageStyle = {
  position: "absolute",
  top: 60,
  right: 0,
}
