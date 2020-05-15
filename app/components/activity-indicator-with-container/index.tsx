import { spacing, color } from "../../theme"
import React from "react";
import { View, ActivityIndicator } from "react-native"

export function ActivityIndicatorWithContainer() {
  return  <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
  <ActivityIndicator size="small" color={color.palette.white} />
</View>
}