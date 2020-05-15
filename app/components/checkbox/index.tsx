import React from "react"
import { ViewStyle, TextStyle, TouchableOpacity } from "react-native"

import { spacing } from "../../theme"
import { Icon } from "../icon/icon"
import { Text } from "../text/text"

const CHECKBOX_CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: spacing.medium,
  marginTop: spacing.small,
}

const CHECKBOX_LABEL: TextStyle = {
  flex: 1,
  fontWeight: "300",
  fontSize: 12,
  lineHeight: 20,
  marginLeft: spacing.small,
}

export const CheckBox = ({ label, value, onChange }) => {
  return (
    <TouchableOpacity onPress={onChange} style={CHECKBOX_CONTAINER}>
      <Icon icon={value ? "checkbox" : "emptyCheckbox"} />
      <Text style={CHECKBOX_LABEL}>{label}</Text>
    </TouchableOpacity>
  )
}
