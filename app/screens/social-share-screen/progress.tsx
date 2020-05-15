import * as React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import NumberFormat from "react-number-format"
import LinearGradient from "react-native-linear-gradient"

import { color, spacing } from "../../theme"
import { Text } from "../../components"

const EVENT_TITLE: TextStyle = {
  fontWeight: "600",
  fontSize: 14,
}

const ACTIVE_TEXT: TextStyle = {
  fontWeight: "700",
  fontSize: 12,
  color: color.activeColor,
  marginHorizontal: spacing.tiny,
}

const TEXT: TextStyle = {
  fontWeight: "500",
  fontSize: 10,
}

const UNIT_TEXT: TextStyle = {
  fontWeight: "300",
  fontSize: 10,
}

const PROGRESS_BAR: ViewStyle = {
  height: 10,
  width: "100%",
  backgroundColor: color.palette.cloudBurst,
  borderRadius: 8,
  marginVertical: spacing.smaller,
}

const ACTIVE_BAR = (current, total) => ({
  width: `${(current / total) * 100}%`,
  height: "100%",
  borderRadius: 8,
})

const ROW: ViewStyle = {
  flexDirection: "row",
}

// const COLUMN: ViewStyle = {
//   flexDirection: "column",
// }

const CENTER: ViewStyle = {
  alignItems: "center",
}

const ROW_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.smaller,
}

// interface IProgressProps {
//   distance: number;
//   totalDistance: number;
//   eventTitle: string;
// }

export class Progress extends React.Component<any> {
  render() {
    const { distance, totalDistance, eventTitle, totalTime, avgTime } = this.props
    return (
      <View>
        <View style={ROW_CONTAINER}>
          <View style={{ ...ROW, flex: 1 }}>
            <Text style={EVENT_TITLE}>{eventTitle}</Text>
          </View>
          <View style={[ROW, CENTER]}>
            <NumberFormat
              value={distance}
              displayType="text"
              decimalScale={2}
              thousandSeparator
              renderText={text => <Text style={ACTIVE_TEXT}>{text}</Text>}
            />
            <NumberFormat
              value={totalDistance}
              displayType="text"
              decimalScale={2}
              thousandSeparator
              prefix="/ "
              suffix=" km"
              renderText={text => <Text style={UNIT_TEXT}>{text}</Text>}
            />
          </View>
        </View>
        <View style={PROGRESS_BAR}>
          <LinearGradient
            colors={[color.palette.purple, color.palette.lipstick]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ACTIVE_BAR(distance, totalDistance)}
          />
        </View>

        <View style={ROW_CONTAINER}>
          <View style={{ ...ROW, flex: 0.5, alignItems: "center" }}>
            <Text style={TEXT}>เวลาวิ่งรวม</Text>
            <Text style={ACTIVE_TEXT}>{totalTime}</Text>
            <Text style={UNIT_TEXT}>hour</Text>
          </View>
          <View style={{ ...ROW, flex: 0.5, justifyContent: "flex-end", alignItems: "center" }}>
            <Text style={TEXT}>เวลาวิ่งเฉลี่ย </Text>
            <Text style={ACTIVE_TEXT}>{avgTime}</Text>
            <Text style={UNIT_TEXT}>/ km</Text>
          </View>
        </View>
      </View>
    )
  }
}
