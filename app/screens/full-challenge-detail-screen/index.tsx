import React, { FunctionComponent, useState, useEffect, Fragment } from "react"
import { View } from "react-native"
import NumberFormat from "react-number-format"
import moment from "moment"

import { FullChallengeDetailScreenProps } from "./types"
import {
  FULL,
  CONTAINER,
  TITLE,
  HORIZONTAL_DIVIDER,
  VERTICAL_DIVIDER,
  FLEX_CONTAINER,
  FLEX_ITEM,
  FLEX_TITLE,
  FLEX_SUBTITLE,
  BUTTON,
  BUTTON_TEXT,
} from "./styles"
import { Screen, Header, Text, Map } from "../../components"
import { CHALLENGE_TYPES } from "../../utils/constants"
import { Progress } from "./progress"
import { AccordionView } from "./accordion"
import { PrimaryButton } from "../../components/button/primary-button"
import { getChallenge, getMyChallengeStatistic, getMap } from "../../services/api"
import { spacing } from "../../theme"
import { IChallenge } from "../payment-screen/types"
import { IMapProps } from "../../components/map/map.props"

function shouldShowSendFormButton(myStatistic:any, challenge: IChallenge) {
  return myStatistic && (myStatistic.distance || 0) < challenge.distance
}

interface IState {
  challenge: any;
  map: IMapProps | null;
  myStatistic: any;
  challengeStatistic: any;
}

export const FullChallengeDetailScreen: FunctionComponent<FullChallengeDetailScreenProps> = ({
  navigation,
}) => {
  const [state, setState] = useState<IState>({
    challenge: null,
    map: null,
    myStatistic: null,
    challengeStatistic: null,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    // @ts-ignore
    const { challenge, map, challengeId } = navigation.state.params
    if (challengeId) {
      const challenge = await getChallenge(challengeId)
      const map = await getMap(challengeId)
      const statistic = await getMyChallengeStatistic(challengeId)
      setState({
        ...state,
        challenge,
        map: challengeMap(map),
        myStatistic: statistic.my_statistic,
        challengeStatistic: statistic.challenge_statistic,
      })
    } else {
      const { my_statistic, challenge_statistic } = await getMyChallengeStatistic(challenge.id)
      setState({
        ...state,
        challenge,
        map,
        myStatistic: my_statistic,
        challengeStatistic: challenge_statistic,
      })
    }
  }

  const challengeMap = rawData => ({
    svg: {
      dash: rawData.svg.dash,
      transform: {
        translateX: rawData.svg.translateX,
        translateY: rawData.svg.translateY,
      },
    },
    totalDistance: rawData.total_distance / 1000,
    numberOfCheckPoint: 0,
    friendProgresses: rawData.friend_progresses.map(item => ({
      distance: item.distance / 1000,
      imageUrl: item.image_url,
    })),
    myProgress: {
      distance: rawData.my_progress.distance / 1000,
      imageUrl: rawData.my_progress.image_url,
    },
  })

  const goToPreviousScreen = () => navigation.goBack()

  const navigateTo = routeName => () =>
    navigation.navigate(routeName, { challenge: state.challenge, map: state.map })

  return (
    <View style={FULL}>
      <Header
        headerText={state.challenge ? CHALLENGE_TYPES[state.challenge.type.toString()] : ""}
        leftIcon="back"
        onLeftPress={goToPreviousScreen}
        rightIcon="export"
        onRightPress={navigateTo("SocialShareScreen")}
      />
      <Screen
        preset="scroll"
        loading={!state.challenge && !state.map}
        onRefresh={() => fetchData()}
      >
        {state.challenge && (
          <Fragment>
            <View style={{paddingLeft: spacing.medium, paddingRight: spacing.medium, paddingTop: spacing.medium}}>
              <Text style={TITLE}>{CHALLENGE_TYPES[state.challenge.type.toString()]}</Text>
              {state.map && <Map event={state.challenge.event} {...state.map} />}
            </View>
            <View style={HORIZONTAL_DIVIDER} />
            <View style={FLEX_CONTAINER}>
              <View style={FLEX_ITEM}>
                <NumberFormat
                  value={state.challenge.distance / 1000}
                  displayType="text"
                  decimalScale={0}
                  thousandSeparator
                  suffix=" km"
                  renderText={text => <Text style={FLEX_TITLE}>{text}</Text>}
                />
                <Text style={FLEX_SUBTITLE}>ระยะทาง</Text>
              </View>
              <View style={VERTICAL_DIVIDER} />
              <View style={FLEX_ITEM}>
                <Text style={FLEX_TITLE}>{state.myStatistic.bib}</Text>
                <Text style={FLEX_SUBTITLE}>เลขบิบ</Text>
              </View>
            </View>
            <View style={HORIZONTAL_DIVIDER} />
            <View style={CONTAINER}>
              <Progress
                distance={state.myStatistic ? state.myStatistic.total_distance / 1000 : 0}
                totalDistance={state.challenge.distance / 1000}
                eventTitle={state.challenge.event.name}
                totalTime={
                  state.myStatistic
                    ? moment(state.myStatistic.total_time, "HH:mm:ss").format("HH.mm.ss")
                    : "00.00.00"
                }
                avgTime={
                  state.myStatistic
                    ? moment(state.myStatistic.average_time, "HH:mm:ss").format("HH.mm.ss")
                    : "00.00.00"
                }
              />
            </View>
            <View style={HORIZONTAL_DIVIDER} />
            {state.challengeStatistic && (
              <AccordionView
                challenge={state.challenge}
                totalPeople={state.challengeStatistic.total_applications}
                avgDistance={state.challengeStatistic.averge_km_per_day / 1000}
                totalDistance={state.challengeStatistic.total_distance / 1000}
              />
            )}
            {shouldShowSendFormButton(state.myStatistic, state.challenge)&& <View style={{ paddingHorizontal: spacing.medium }}>
              <PrimaryButton style={BUTTON} onPress={navigateTo("SendForm")}>
                <Text style={BUTTON_TEXT}>ส่งผลการวิ่ง</Text>
              </PrimaryButton>
            </View>}
          </Fragment>
        )}
      </Screen>
    </View>
  )
}
