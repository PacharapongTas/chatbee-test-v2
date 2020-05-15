import React from "react"
import { Circle, Defs, RadialGradient, Stop, Text } from "react-native-svg"
import uuid from "uuid"

import { IPoint } from "./map.props"
import { color } from "../../theme"
import { pointPresets, PointPresetNames } from "./point.presets"
import { LineDash } from "./line"
import { mapYDistance } from "./constant"

interface IStartPointProps extends IPoint {
  preset?: PointPresetNames
  title?: string
  desc?: string
}

const RADIAS = 2

const RADIAS_1 = RADIAS * 3
const RADIAS_2 = RADIAS * 7
const RADIAS_3 = RADIAS * 14

const fontSize = 14

export class Point extends React.Component<IStartPointProps> {
  render() {
    const { x, y, preset = "check", title, desc } = this.props
    const id = uuid()
    return (
      <React.Fragment>
        <LineDash x={x} y1={y} y2={y + mapYDistance} color={color.palette.heliotrope} />
        <Defs>
          <RadialGradient
            id={id}
            cx={x}
            cy={y}
            rx={RADIAS_3}
            ry={RADIAS_3}
            fx={x}
            fy={y}
            gradientUnits="userSpaceOnUse"
          >
            {pointPresets[preset].grad.map((p, i) => (
              <Stop offset={p.offset} stopColor={p.stopColor} key={i} />
            ))}
          </RadialGradient>
        </Defs>
        <Circle cx={x} cy={y} r={RADIAS_3} fill={`url(#${id})`} strokeOpacity={0} opacity={0.2} />
        <Circle
          cx={x}
          cy={y}
          r={RADIAS_2}
          fill={pointPresets[preset].border}
          strokeOpacity={0}
          opacity={0.7}
        />
        <Circle cx={x} cy={y} r={RADIAS_1} fill={pointPresets[preset].inner} strokeOpacity={0} />
        {title && (
          <Text
            x={x}
            y={y - 15}
            //   TODO: fontFamily="Poppins"
            fontSize={fontSize}
            textAnchor="middle"
            fill={color.palette.white}
            strokeWidth={0}
          >
            {title}
          </Text>
        )}
        {desc && (
          <Text
            x={x}
            y={y - 5}
            //   TODO: fontFamily="Poppins"
            fontSize={fontSize}
            textAnchor="middle"
            fill={color.palette.white}
            strokeWidth={0}
          >
            {desc}
          </Text>
        )}
      </React.Fragment>
    )
  }
}
