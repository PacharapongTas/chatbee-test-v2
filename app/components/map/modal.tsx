import React from "react"
import { G, Path, Text } from "react-native-svg"

import { ModalPresetNames, modalPresets } from "./modal.presets"

interface IPinModalProps {
  preset: ModalPresetNames
  desc: string
  x: number
  y: number
}

interface IPinModalStates {
  isShow: boolean
}

export class PinModal extends React.PureComponent<IPinModalProps, IPinModalStates> {
  constructor(props) {
    super(props)

    this.state = {
      isShow: false,
    }
  }

  render() {
    const { x, y, preset, desc } = this.props

    return (
      <G
        onPressIn={() => this.setState({ isShow: true })}
        onPressOut={() => this.setState({ isShow: false })}
      >
        {this.props.children}
        {this.state.isShow && (
          <G transform="translate(-75 -500)" x={x} y={y} scale={3}>
            <G transform="matrix(1, 0, 0, 1, 56.76, 483.06)">
              <Path
                d="M-2006.939-1626.332h-30.009a2,2,0,0,1-2-2V-1642a2,2,0,0,1,2-2h52.31a2,2,0,0,1,2,2v13.669a2,2,0,0,1-2,2h-15.294l-3.5,2.331Z"
                transform="translate(2056.95 1655.55)"
                fill="#161c33"
                strokeOpacity={0}
              />
            </G>
            <Text
              transform="translate(95.211 508)"
              fill="#fff"
              fontSize="5"
              fontFamily="Helvetica-Light, Helvetica"
              fontWeight="300"
              strokeOpacity={0}
            >
              {desc}
            </Text>
            <Text
              transform="translate(95.211 502)"
              fill="#fff"
              fontSize="4"
              fontFamily="Thonburi-Light, Thonburi"
              fontWeight="300"
              opacity="0.5"
              strokeOpacity={0}
            >
              {modalPresets[preset].title}
            </Text>
            {modalPresets[preset].icon()}
          </G>
        )}
      </G>
    )
  }
}
