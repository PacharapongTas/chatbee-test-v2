import { ViewStyle, ImageStyle } from "react-native"

export const BACKGROUND: ViewStyle = {
  backgroundColor: "rgba(0,0,0,0.5)",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const CONTAINER: ViewStyle = {
  position: "relative",
}

export const IMAGE: ImageStyle = {
  width: 300,
  height: 300,
  resizeMode: 'contain'
}
