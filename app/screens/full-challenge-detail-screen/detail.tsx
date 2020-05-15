import React from "react"
import { View, ViewStyle, Text, TextStyle } from "react-native"
import { color } from "../../theme"
import { Icon } from "../../components"

const CONTAINER: ViewStyle = {
  flexDirection: "row",
}

const DETAIL_COLUMN: ViewStyle = {
  width: "33.33%",
  alignItems: "center",
}

const ICON_CONTAINER: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: color.palette.mirrage,
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  marginBottom: 10,
}

const TEXT_TITLE: TextStyle = {
  fontSize: 12,
  color: color.palette.white,
  paddingVertical: 2,
}

const TEXT_VALIE: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  color: color.palette.lipstick,
  paddingVertical: 2,
}

const TEXT_UNIT: TextStyle = {
  fontSize: 10,
  color: color.palette.white,
  opacity: 0.5,
}

interface IDetailProps {
  totalPeople: number
  avgDistance: number
  totalDistance: number
}

export class Detail extends React.Component<IDetailProps> {
  render() {
    const { avgDistance, totalPeople, totalDistance } = this.props
    return (
      <View style={CONTAINER}>
        <View style={DETAIL_COLUMN}>
          <View style={ICON_CONTAINER}>
            <Icon icon="runLeft" />
          </View>
          <Text style={TEXT_TITLE}>จำนวนคนทั้งหมด</Text>
          <Text style={TEXT_VALIE}>{totalPeople}</Text>
          <Text style={TEXT_UNIT}>คน</Text>
        </View>
        <View style={DETAIL_COLUMN}>
          <View style={ICON_CONTAINER}>
            <Icon icon="mile" />
          </View>
          <Text style={TEXT_TITLE}>ระยะทางเฉลี่ย</Text>
          <Text style={TEXT_VALIE}>{avgDistance}</Text>
          <Text style={TEXT_UNIT}>กิโลเมตร/วัน</Text>
        </View>
        <View style={DETAIL_COLUMN}>
          <View style={ICON_CONTAINER}>
            <Icon icon="pinOnMap" />
          </View>
          <Text style={TEXT_TITLE}>ระยะทางทั้งหมด</Text>
          <Text style={TEXT_VALIE}>{totalDistance}</Text>
          <Text style={TEXT_UNIT}>กิโลเมตร</Text>
        </View>
      </View>
    )
  }
}
