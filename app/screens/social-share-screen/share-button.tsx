import React, { Component } from "react"
import { View, Text, TouchableHighlight } from "react-native"

import { Icon } from "../../components"
import { color } from "../../theme/color"
import { IconTypes } from "../../components/icon/icons"
import { spacing } from "../../theme"

interface IProgressProps {
  onPress: Function
  icon: IconTypes
  title: string
}

function fallBackFn() {}

export class ShareButton extends Component<IProgressProps> {
  render() {
    const { onPress, icon, title } = this.props
    return (
      <TouchableHighlight onPress={() => (onPress || fallBackFn)()}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon icon={icon} style={{ width: 48, height: 48 }} />
          <Text style={{ fontSize: 14, color: color.palette.white, marginTop: spacing.small }}>
            {title}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}
