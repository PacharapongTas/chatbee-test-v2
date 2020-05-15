import React, { useState } from "react"
import { View, ViewStyle } from "react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"

import { color } from "../../theme"
import { Header, Text } from "../../components"
import { ProfileScreen } from "../profile-screen"
import { MyChallengeScreen } from "../my-challenge-screen"
import { FriendsScreen } from "../friends-screen"
import { NotificationBar } from "../../components/notification-bar"

const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.surface_main,
}

const TABBAR_INDICATOR: ViewStyle = {
  backgroundColor: color.activeColor,
}

const TABBAR_BACKGROUND: ViewStyle = {
  backgroundColor: color.darkBackground,
}

export const MyAccountScreen = ({ navigation }) => {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: "Profile", title: "ข้อมูลส่วนตัว" },
      { key: "MyChallenge", title: "My Challenge" },
      { key: "Friends", title: "เพื่อน" },
    ],
  })

  const renderScene = SceneMap({
    Profile: () => <ProfileScreen navigation={navigation} />,
    MyChallenge: () => <MyChallengeScreen navigation={navigation} />,
    Friends: () => <FriendsScreen navigation={navigation} />,
  })

  const renderTabBar = props => (
    <TabBar
      {...props}
      renderLabel={({ route, focused }) => (
        <Text
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

  const goToSettingsScreen = () => navigation.navigate("Settings")

  return (
    <View style={FULL}>
      <Header headerText="บัญชีของฉัน" rightIcon="gear" onRightPress={goToSettingsScreen} />
      <TabView
        navigationState={{ index: state.index, routes: state.routes }}
        renderScene={renderScene}
        onIndexChange={index => setState({ ...state, index })}
        renderTabBar={renderTabBar}
      />
    </View>
  )
}
