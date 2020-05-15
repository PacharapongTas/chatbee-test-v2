import * as React from "react"
import { View, ViewStyle, ImageStyle, TextStyle } from "react-native"

import { spacing } from "../../theme"
import { Icon } from "../icon/icon"
import { Text } from "../text/text"

const BULLET_ITEM: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.normal,
  paddingBottom: spacing.normal,
  borderBottomWidth: 1,
  borderBottomColor: "#3A3048",
}
const BULLET_CONTAINER: ViewStyle = {
  marginRight: spacing.normal - 1,
  marginTop: spacing.smaller,
}
const BULLET: ImageStyle = {
  width: 8,
  height: 8,
}
const BULLET_TEXT: TextStyle = {
  flex: 1,
  color: "#BAB6C8",
  fontSize: 15,
  lineHeight: 22,
}

export interface BulletItemProps {
  text: string
}

export function BulletItem(props: BulletItemProps) {
  return (
    <View style={BULLET_ITEM}>
      <Icon icon="bullet" containerStyle={BULLET_CONTAINER} style={BULLET} />
      <Text style={BULLET_TEXT} text={props.text} />
    </View>
  )
}
