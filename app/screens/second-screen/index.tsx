import React, { FunctionComponent, useEffect, useState, Fragment } from "react"
import { View, Image, TouchableOpacity } from "react-native"
import NumberFormat from "react-number-format"

import { SecondScreenProps, SecondCardProps } from "./types"
import {
  FULL,
  EVENT_CONTAINER,
  EVENT_TITLE,
  EVENT_DESCRIPTION,
  DIVIDER,
  SECOND_CONTAINER,
  SECOND_IMAGE,
  SECOND_CONTENT,
  SECOND_TITLE,
  SECOND_DISTANCE,
  SECOND_PRICE,
} from "./styles"
import { Screen, Header, Text } from "../../components"

export const SecondScreen: FunctionComponent<SecondScreenProps> = ({ navigation }) => {
  const [state, setState] = useState({
    loading: true,
    eventTitle: "",
    eventDescription: "",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // @ts-ignore
    const { eventTitle, eventId, eventDescription } = navigation.state.params
    setState({ ...state, loading: false, eventTitle, eventDescription })
  }

  const goToPreviousScreen = () => navigation.goBack()

  const checkIsApplied = () => {
    return navigation.navigate("FormInput")
  }

  const renderChallengeCard = ({ imageSrc, title, distance, price }: SecondCardProps) => (
    <TouchableOpacity onPress={async () => await checkIsApplied()}>
      <View style={SECOND_CONTAINER}>
        <Image source={imageSrc} style={SECOND_IMAGE} />
        <View style={SECOND_CONTENT}>
          <Text style={SECOND_TITLE}>{title}</Text>
          <NumberFormat
            value={distance / 1000}
            displayType="text"
            decimalScale={0}
            thousandSeparator
            suffix=" km"
            renderText={text => <Text style={SECOND_DISTANCE}>{text}</Text>}
          />
          {price ? (
            <NumberFormat
              value={price}
              displayType="text"
              fixedDecimalScale
              decimalScale={2}
              thousandSeparator
              suffix=" ฿"
              renderText={text => <Text style={SECOND_PRICE}>{text}</Text>}
            />
          ) : (
            <Text style={SECOND_PRICE}>FREE</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={FULL}>
      <Header headerText={state.eventTitle} leftIcon="back" onLeftPress={goToPreviousScreen} />
      <Screen preset="scroll" loading={state.loading} onRefresh={() => fetchData()}>
        <View style={EVENT_CONTAINER}>
          <Text style={EVENT_TITLE}>{state.eventTitle}</Text>
          <Text style={EVENT_DESCRIPTION}>
            {state.eventDescription ? state.eventDescription : null}
          </Text>
        </View>
        <View style={DIVIDER} />
        {
          <Fragment>
            {renderChallengeCard({
              imageSrc: { uri: "" },
              title: "Go Form Input",
              distance: 0,
              price: 10,
            })}
            <View style={DIVIDER} />
          </Fragment>
        }
      </Screen>
    </View>
  )
}
