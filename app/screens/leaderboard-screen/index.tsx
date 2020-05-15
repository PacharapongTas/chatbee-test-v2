import React, { useState, useEffect } from "react"
import { View, ViewStyle, Dimensions, Image, TextStyle } from "react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"

import { color, spacing } from "../../theme"
import { Header, Text, Screen } from "../../components"
import { LeaderBoardRankScreen } from "./leaderboard"
import { CHALLENGE_TYPES } from "../../utils/constants"
import { fetchApplications } from "../../services/api"
import { PrimaryButton } from "../../components/button/primary-button"

const notJoinChallengeImage = require("../../assets/images/not-join-challenge.png")

const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.cloudBurst,
}

const HEADER: ViewStyle = {
  zIndex: 1,
}

const TABBAR_INDICATOR: ViewStyle = {
  backgroundColor: color.activeColor,
}

const TABBAR_BACKGROUND: ViewStyle = {
  backgroundColor: color.darkBackground,
}

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.huge,
  alignItems: "center",
}

const TITLE: TextStyle = {
  fontWeight: "700",
  fontSize: 24,
  lineHeight: 37,
  marginTop: spacing.huge,
}

const SUBTITLE: TextStyle = {
  fontSize: 14,
  lineHeight: 22,
  opacity: 0.85,
  marginTop: spacing.smaller,
}

const BUTTON: ViewStyle = {
  width: "100%",
  marginTop: spacing.medium,
}

export const LeaderBoardScreen = ({ navigation }) => {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: "MiniMarathon", title: CHALLENGE_TYPES["1"] },
      { key: "HalfMarathon", title: CHALLENGE_TYPES["4"] },
      { key: "FullMarathon", title: CHALLENGE_TYPES["2"] },
      { key: "ExtremeMarathon", title: CHALLENGE_TYPES["3"] },
    ],
    isJoinedChallenge: false,
    loading: true,
  })

  useEffect(() => {
    fetchData()
    const didFocusEvent = navigation.addListener("didFocus", () => fetchData())
    return () => {
      didFocusEvent.remove()
    }
  }, [])

  const fetchData = async () => {
    const { results } = await fetchApplications()
    setState({ ...state, isJoinedChallenge: !!results.length, loading: false })
  }

  const renderScene = SceneMap({
    MiniMarathon: () => <LeaderBoardRankScreen type={1} event_name={CHALLENGE_TYPES["1"]} />,
    HalfMarathon: () => <LeaderBoardRankScreen type={4} event_name={CHALLENGE_TYPES["4"]} />,
    FullMarathon: () => <LeaderBoardRankScreen type={2} event_name={CHALLENGE_TYPES["2"]} />,
    ExtremeMarathon: () => <LeaderBoardRankScreen type={3} event_name={CHALLENGE_TYPES["3"]} />,
  })

  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled={true}
      renderLabel={({ route, focused }) => (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            fontWeight: "500",
            fontSize: 12,
            lineHeight: 19,
            color: focused ? color.text : color.inActiveColor,
          }}
        >
          {route.title}
        </Text>
      )}
      indicatorStyle={TABBAR_INDICATOR}
      style={TABBAR_BACKGROUND}
    />
  )

  return (
    <View style={FULL}>
      <Header headerText="ตารางอันดับ" style={HEADER} />
      {state.isJoinedChallenge ? (
        <TabView
          navigationState={{ index: state.index, routes: state.routes }}
          renderScene={renderScene}
          onIndexChange={index => setState({ ...state, index })}
          renderTabBar={renderTabBar}
          lazy={false}
          initialLayout={{ width: Dimensions.get("window").width }}
          removeClippedSubviews={false}
        />
      ) : (
        <Screen loading={state.loading} backgroundColor={color.darkBackground2} style={CONTAINER}>
          <Image source={notJoinChallengeImage} />
          <Text style={TITLE}>คุณยังไม่ได้เข้าร่วมชาเลนจ์</Text>
          <Text style={SUBTITLE}>เริ่มต้นชาเลนจ์ของคุณได้เลยตอนนี้</Text>
          <PrimaryButton containerStyle={BUTTON} onPress={() => navigation.navigate("Events")}>
            <Text>เลือกชาเลนจ์</Text>
          </PrimaryButton>
        </Screen>
      )}
    </View>
  )
}
