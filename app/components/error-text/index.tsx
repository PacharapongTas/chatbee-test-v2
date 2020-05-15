import React from "react";
import { Text } from "react-native";
import { color, spacing } from "../../theme";

const STYLE = {
  fontSize: 12,
  marginTop: spacing.tiny,
  color: color.error,
}

interface IProps {
  error?: string
}

export function ErrorText({error}: IProps) {
  if (!error) {
    return null
  }

return <Text style={STYLE}>{error}</Text>
}