import { ViewStyle, ImageStyle, TextStyle } from "react-native"
import { color, spacing } from "../../theme"

export const BACKGROUND: ViewStyle = {
  backgroundColor: "rgba(0,0,0,0.5)",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}

export const CONTAINER: ViewStyle = {
  position: "relative",
  display: 'flex',
  width: '80%',
  height: '30%',
  backgroundColor: color.darkBackground,
  borderRadius: 8,
  padding: spacing.large
}

export const IMAGE: ImageStyle = {
  width: 300,
  height: 300,
}

export const OUTLINE_BUTTON: ViewStyle = {
  height: 50,
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: 'transparent',
  borderColor: 'white',
  borderWidth: 1,
}

export const TITLE_CONTAINER: ViewStyle = {
  justifyContent: 'center', 
  flex: 1,
  paddingBottom: spacing.medium,
}

export const TITLE: TextStyle = {
  fontWeight: "bold",
  fontSize: 18,
  textAlign: 'center',
}

export const DESCRIPTION_CONTAINER: ViewStyle = {
  flex: 3,
  paddingBottom: spacing.medium,
}

export const DESCRIPTION: TextStyle = {
  textAlign: 'center',
  fontSize: 14,
}


export const BUTTONS: ViewStyle = {
  display: 'flex',
  flexDirection: 'row'
}


export const BUTTON_CONTAINER: ViewStyle = {
  width: '50%',
}

