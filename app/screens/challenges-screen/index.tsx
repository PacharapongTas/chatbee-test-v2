import React, { FunctionComponent, useEffect, useState, Fragment } from "react"
import { View, Image, TouchableOpacity } from "react-native"
import NumberFormat from "react-number-format"

import { ChallengesScreenProps, ChallengeCardProps } from "./types"
import {
  FULL,
  EVENT_CONTAINER,
  EVENT_TITLE,
  EVENT_DESCRIPTION,
  DIVIDER,
  CHALLENGE_CONTAINER,
  CHALLENGE_IMAGE,
  CHALLENGE_CONTENT,
  CHALLENGE_TITLE,
  CHALLENGE_DISTANCE,
  CHALLENGE_PRICE,
} from "./styles"
import { Screen, Header, Text } from "../../components"
import { fetchChallenges, getApplied } from "../../services/api"
import { CHALLENGE_TYPES } from "../../utils/constants"

export const ChallengesScreen: FunctionComponent<ChallengesScreenProps> = ({ navigation }) => {
  const [state, setState] = useState({
    loading: true,
    eventTitle: "",
    eventDescription: "",
    challenges: [],
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // @ts-ignore
    const { eventTitle, eventId, eventDescription } = navigation.state.params
    const { results } = await fetchChallenges(eventId)
    setState({ ...state, loading: false, eventTitle, challenges: results, eventDescription })
  }

  const goToPreviousScreen = () => navigation.goBack()

  const checkIsApplied = async challengeId => {
    const { applied } = await getApplied(challengeId)
    if (applied) {
      return navigation.navigate("ChallengeFullDetail", { challengeId })
    } else {
      return navigation.navigate("ChallengeDetail", { challengeId })
    }
  }

  const renderChallengeCard = ({
    imageSrc,
    title,
    distance,
    price,
    challengeId,
  }: ChallengeCardProps) => (
    <TouchableOpacity onPress={async () => await checkIsApplied(challengeId)}>
      <View style={CHALLENGE_CONTAINER}>
        <Image source={imageSrc} style={CHALLENGE_IMAGE} />
        <View style={CHALLENGE_CONTENT}>
          <Text style={CHALLENGE_TITLE}>{title}</Text>
          <NumberFormat
            value={distance / 1000}
            displayType="text"
            decimalScale={0}
            thousandSeparator
            suffix=" km"
            renderText={text => <Text style={CHALLENGE_DISTANCE}>{text}</Text>}
          />
          {price ? <NumberFormat
            value={price}
            displayType="text"
            fixedDecimalScale
            decimalScale={2}
            thousandSeparator
            suffix=" ฿"
            renderText={text => <Text style={CHALLENGE_PRICE}>{text}</Text>}
          /> : <Text style={CHALLENGE_PRICE}>FREE</Text>}
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
        {state.challenges.map((challenge, index) => (
          <Fragment key={index}>
            {renderChallengeCard({
              imageSrc: { uri: challenge.pictures[0].image },
              title: CHALLENGE_TYPES[challenge.type.toString()],
              distance: challenge.distance,
              price: challenge.price,
              challengeId: challenge.id,
            })}
            <View style={DIVIDER} />
          </Fragment>
        ))}
      </Screen>
    </View>
  )
}
