import React, { Component, Fragment } from "react"
import Accordion from "react-native-collapsible/Accordion"
import { View, ViewStyle, TextStyle } from "react-native"
import { Svg, Path } from "react-native-svg"

import { CONTAINER, HORIZONTAL_DIVIDER, TITLE } from "./styles"
import { Detail } from "./detail"
import { Text } from "../../components"
import { Rank } from "./rank"
import { spacing } from "../../theme"
import { CHALLENGE_TYPES } from "../../utils/constants"

export const DESC_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing.medium,
}

export const TEXT_DESC: TextStyle = {
  fontWeight: "300",
  fontSize: 12,
  opacity: 0.7,
}

const CaretArrow = ({ upsideDown }) => (
  <Svg
    width="15"
    height="15"
    fill="rgba(255,255,255,0.5)"
    viewBox="0 0 448 512"
    style={upsideDown && { transform: [{ rotate: "180deg" }] }}
  >
    <Path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
  </Svg>
)

export class AccordionView extends Component<any> {
  state = {
    activeSections: [0, 1],
  }

  sections = () => {
    const { totalPeople, avgDistance, totalDistance, challenge } = this.props
    return [
      {
        title: "รายละเอียดชาเลนจ์",
        content: (
          <Detail
            totalDistance={totalDistance}
            avgDistance={avgDistance}
            totalPeople={totalPeople}
          />
        ),
      },
      {
        title: `อันดับเวลาที่ดีที่สุดใน ${CHALLENGE_TYPES[this.props.challenge.type.toString()]}`,
        desctiption: `สถิตินักวิ่ง 9 อันดับแรกใน ${
          CHALLENGE_TYPES[this.props.challenge.type.toString()]
        } และอันดับของคุณในขณะนี้`,
        content: <Rank challenge={challenge} />,
      },
    ]
  }

  _renderHeader = (section, index, isActive) => (
    <Fragment>
      <View style={CONTAINER}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={TITLE}>{section.title}</Text>
          <CaretArrow upsideDown={isActive} />
        </View>
        {section.desctiption ? <Text style={TEXT_DESC}>{section.desctiption}</Text> : null}
      </View>
      <View style={HORIZONTAL_DIVIDER} />
    </Fragment>
  )

  _renderContent = section => {
    return (
      <Fragment>
        <View style={CONTAINER}>{section.content}</View>
        <View style={HORIZONTAL_DIVIDER} />
      </Fragment>
    )
  }

  _updateSections = activeSections => {
    this.setState({ activeSections })
  }

  render() {
    const { activeSections } = this.state
    return (
      <Accordion
        sections={this.sections()}
        activeSections={activeSections}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onChange={this._updateSections}
      />
    )
  }
}
