import React, { Fragment, useEffect, useState } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
  FlatList,
  TouchableOpacity,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import NumberFormat from "react-number-format"
import moment from "moment"

import { Text, Screen, Icon } from "../../components"
import { spacing, color } from "../../theme"
import { PrimaryButton } from "../../components/button/primary-button"
import { fetchApplications } from "../../services/api"

const FULL: ViewStyle = {
  flex: 1,
}

const SCREEN: ViewStyle = {
  padding: spacing.medium,
}

const TITLE: TextStyle = {
  fontWeight: "700",
  fontSize: 14,
  marginBottom: spacing.normal,
}

const EVENT_TITLE: TextStyle = {
  fontWeight: "600",
  fontSize: 14,
  marginLeft: spacing.smaller,
}

const IMAGE: ImageStyle = {
  width: "100%",
  aspectRatio: 16/9,
  alignSelf: "center",
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
}

const ACTIVE_BAR = (current, total) => ({
  width: `${(current / total) * 100}%`,
  height: "100%",
  borderRadius: 8,
})

const BUTTON: ViewStyle = {
  marginTop: spacing.normal,
  marginBottom: spacing.medium,
}

const ROW: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const ROW_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.normal,
}

const REWARD_CONTAINER: ViewStyle = {
  alignItems: "center",
  margin: spacing.smaller,
}

const REWARD_IMAGE = isFinished => ({
  width: 90,
  height: 90,
  opacity: isFinished ? 1 : 0.3,
})

const REWARD_TITLE: TextStyle = {
  fontWeight: "500",
  fontSize: 12,
}

const REWARD_DATE: TextStyle = {
  fontWeight: "300",
  fontSize: 8,
  opacity: 0.5,
}

const HINT_CONTAINER: ViewStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
}

const HINT_TEXT: TextStyle = {
  fontSize: 12,
  opacity: 0.5,
}

export const MyChallengeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState([])
  const [badges, setBadges] = useState([])

  useEffect(() => {
    moment().locale("th")
    fetchData()
  }, [])

  const fetchData = async () => {
    const activeApplications = await fetchApplications(true)
    const activeEvents = activeApplications.results.map(application => ({
      id: application.challenge.id,
      imageSrc: { uri: application.challenge.event.pictures[0].image },
      eventTitle: application.challenge.event.name,
      distance: application.distance,
      totalDistance: application.challenge.distance,
    }))
    setEvents(activeEvents)

    const applications = await fetchApplications()
    const badges = applications.results.map(application => ({
      id: application.challenge.id.toString(),
      imageSrc: { uri: application.challenge.badge ? application.challenge.badge.picture.image : '' },
      isFinished: application.completed,
      eventTitle: application.challenge.event.name,
      date: application.created_at,
    }))
    setBadges(badges)
    setLoading(false)
  }

  const checkDistance = (distance, totalDistance) => {
    if (distance < totalDistance) {
      return distance
    } else {
      return totalDistance
    }
  }

  const renderChallenge = ({
    key,
    imageSrc,
    eventTitle,
    distance,
    totalDistance,
    onPress,
  }: any) => (
    <Fragment key={key}>
      <Image source={imageSrc} style={IMAGE} />
      <View style={ROW_CONTAINER}>
        <View style={{ ...ROW, flex: 1 }}>
          <Icon icon="flag" />
          <Text style={EVENT_TITLE}>{eventTitle}</Text>
        </View>
        <View style={ROW}>
          <NumberFormat
            value={checkDistance(distance, totalDistance) / 1000}
            displayType="text"
            decimalScale={2}
            thousandSeparator
            renderText={text => <Text style={ACTIVE_TEXT}>{text}</Text>}
          />
          <NumberFormat
            value={totalDistance / 1000}
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
          style={ACTIVE_BAR(checkDistance(distance, totalDistance), totalDistance)}
        >
          <View />
        </LinearGradient>
      </View>
      <PrimaryButton onPress={onPress} style={BUTTON}>
        <Text>ดูรายละเอียด</Text>
      </PrimaryButton>
    </Fragment>
  )

  const renderBadge = ({ id, imageSrc, isFinished, eventTitle, date }: any) => (
    <TouchableOpacity
      style={REWARD_CONTAINER}
      onPress={() => navigation.navigate("ChallengeFullDetail", { challengeId: id })}
    >
      <Image source={imageSrc} style={REWARD_IMAGE(isFinished)} />
      <Text style={REWARD_TITLE}>{eventTitle}</Text>
      <Text style={REWARD_DATE}>
        {moment(date).format("D MMMM")} {moment(date).get("year") + 543}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={FULL}>
      <Screen
        preset="scroll"
        loading={loading}
        backgroundColor={color.darkBackground2}
        style={SCREEN}
        onRefresh={() => fetchData()}
      >
        {events.length ? (
          <Fragment>
            <Text style={TITLE}>ชาเลนจ์ปัจจุบัน</Text>
            {events.map((event, index) =>
              renderChallenge({
                key: index,
                imageSrc: event.imageSrc,
                eventTitle: event.eventTitle,
                distance: event.distance,
                totalDistance: event.totalDistance,
                onPress: () =>
                  navigation.navigate("ChallengeFullDetail", { challengeId: event.id }),
              }),
            )}
          </Fragment>
        ) : null}
        {badges.length ? (
          <Fragment>
            <Text style={TITLE}>รางวัลความสำเร็จ</Text>
            <FlatList
              data={badges}
              renderItem={({ item: { id, imageSrc, isFinished, eventTitle, date } }) =>
                renderBadge({ id, imageSrc, isFinished, eventTitle, date })
              }
              keyExtractor={item => item.id}
              horizontal
            />
          </Fragment>
        ) : null}
        {!events.length && !badges.length ? (
          <View style={HINT_CONTAINER}>
            <Text style={HINT_TEXT}>คุณยังไม่ได้เข้าร่วมชาเลนจ์ใดๆ</Text>
          </View>
        ) : null}
      </Screen>
    </View>
  )
}
