import React from "react"
import { TextStyle } from "react-native"

import { Text } from "../index"
import { spacing } from "../../theme"

interface Props {
  title: string
  style?: TextStyle
}

const TEXT: TextStyle = {
  top: spacing.smaller,
  fontSize: 9
}

export const TabBarLabel = ({ title, style }: Props) => (
  <Text style={[TEXT, style]}>{title}</Text>
)
