import * as React from "react"
import { Image, Circle, Defs, ClipPath } from "react-native-svg"
import { ITransform } from "./map.props"
import { color } from "../../theme"
import { PinModal } from "./modal"
import numeral from "numeral"
import { pinPresets, PinPresetNames } from "./pin.presets"
import { LineDash } from "./line"

interface IMyPinProps {
  x: number
  y: number
  transform: ITransform
  imageUrl: string
  distance: number
  preset: PinPresetNames
}

interface IMyPinStates {
  isShow: boolean
}

export class PinFriend extends React.PureComponent<IMyPinProps, IMyPinStates> {
  constructor(props) {
    super(props)

    this.state = {
      isShow: false,
    }
  }

  render() {
    const { x, y, transform, imageUrl, distance, preset } = this.props
    const { radius, bottomMargin, shouldShowBorder } = pinPresets[preset]

    const widthHeight = radius * 10
    const imageX = x + transform.translateX - radius - 16
    const imageY = y + transform.translateY - bottomMargin - 60
    const circleX = imageX + widthHeight / 2
    const circleY = imageY + widthHeight / 2

    const clipPathId = `clip-${imageUrl}`
    const clipPath = `url(#${clipPathId})`

    return (
      <PinModal
        preset="pin"
        x={x + transform.translateX - 104}
        y={y + transform.translateY - radius * 3.5 - 130}
        desc={`${numeral(distance).format("0.0[0]")} กิโลเมตร`}
      >
        <LineDash
          x={x + transform.translateX}
          y1={y + transform.translateY - bottomMargin - 20}
          y2={y + transform.translateY}
          color={color.palette.white}
        />
        <Circle
          cx={x + transform.translateX}
          cy={y + transform.translateY - bottomMargin + radius - 46}
          r={radius + 28}
          strokeOpacity={1}
          fillOpacity={0}
          opacity={shouldShowBorder ? 1 : 0}
          stroke={color.palette.white}
        />
        <Defs>
          <ClipPath id={clipPathId}>
            <Circle cx={circleX} cy={circleY} r={widthHeight / 2}  />
          </ClipPath>
        </Defs>
        <Image
          x={imageX}
          y={imageY}
          width={widthHeight}
          height={widthHeight}
          preserveAspectRatio="xMidYMid slice"
          href={{ uri: imageUrl }}
          clipPath={clipPath}
        />
      </PinModal>
    )
  }
}
