import * as React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import NumberFormat from "react-number-format"
import LinearGradient from "react-native-linear-gradient"

import { Icon, Text } from "../../components"
import { color } from "../../theme/color"
import { spacing } from "../../theme/spacing"

const EVENT_TITLE: TextStyle = {
  fontWeight: "600",
  fontSize: 14,
  marginLeft: spacing.smaller,
}

const ACTIVE_TEXT: TextStyle = {
  fontWeight: "700",
  fontSize: 14,
  color: color.activeColor,
  marginRight: spacing.tiny,
}

const TEXT: TextStyle = {
  fontWeight: "300",
  fontSize: 12,
}

const PROGRESS_BAR: ViewStyle = {
  height: 10,
  width: "100%",
  backgroundColor: color.darkBackground,
  borderRadius: 8,
  marginTop: spacing.smaller,
  marginBottom: spacing.smaller,
}

const ACTIVE_BAR = (current, total) => ({
  width: `${(current / total) * 100}%`,
  height: "100%",
  borderRadius: 8,
})

const ROW: ViewStyle = {
  flexDirection: "row",
}

const COLUMN: ViewStyle = {
  flexDirection: "column",
}

const CENTER: ViewStyle = {
  alignItems: "center",
}

const ROW_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.smaller,
}

interface IProgressProps {
  distance: number
  totalDistance: number
  eventTitle: string
  totalTime: string
  avgTime: string
}

export class Progress extends React.Component<IProgressProps> {
  checkDistance = (distance, totalDistance) => {
    if(distance < totalDistance) {
      return distance
    }else {
      return totalDistance
    }
  }

  render() {
    const { distance, totalDistance, eventTitle, totalTime, avgTime } = this.props
    return (
      <View>
        <View style={ROW_CONTAINER}>
          <View style={{ ...ROW, flex: 1 }}>
            <Icon icon="flag" />
            <Text style={EVENT_TITLE}>{eventTitle}</Text>
          </View>
          <View style={[ROW, CENTER]}>
            <NumberFormat
              value={this.checkDistance(distance, totalDistance)}
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
              renderText={text => <Text style={TEXT}>{text}</Text>}
            />
          </View>
        </View>
        <View style={PROGRESS_BAR}>
          <LinearGradient
            colors={[color.palette.purple, color.palette.lipstick]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={ACTIVE_BAR(this.checkDistance(distance, totalDistance), totalDistance)}
          />
        </View>

        <View style={ROW_CONTAINER}>
          <View style={{ ...ROW }}>
            <Icon icon="clock" />
          </View>
          <View style={{ ...ROW, flex: 0.7 }}>
            <View>
              <Text style={[EVENT_TITLE]}>เวลาวิ่งรวม</Text>
              <Text style={[EVENT_TITLE]}>เวลาวิ่งเฉลี่ย/กิโลเมตร</Text>
            </View>
          </View>
          <View style={{ ...COLUMN, flex: 0.3, justifyContent: "flex-end" }}>
            <View style={{ ...ROW, justifyContent: "flex-end" }}>
              <Text style={ACTIVE_TEXT}>{totalTime}</Text>
              <Text style={TEXT}>hour</Text>
            </View>
            <View style={{ ...ROW, justifyContent: "flex-end" }}>
              <Text style={ACTIVE_TEXT}>{avgTime}</Text>
              <Text style={TEXT}>hour</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
