import React from "react"
import { View } from "react-native"
import { createBottomTabNavigator } from "react-navigation-tabs"

import { Icon } from "../components"
import { EventNavigator } from "./event-navigator"
import { FeedNavigator } from "./feed-navigator"
import { SendNavigator } from "./send-navigator"
import { AccountNavigator } from "./account-navigator"
import { LeaderBoardScreen } from "../screens"
import { Tabbar } from "../components/tab-bar/Tabbar"
import { TabBarLabel } from "../components/tab-bar/TabBarLabel"

export const HomeNavigator = createBottomTabNavigator(
  {
    feed: {
      screen: FeedNavigator,
      navigationOptions: {
        tabBarLabel: <TabBarLabel title="ฟีดข่าว" />,
        tabBarIcon: <Icon icon="feed" />,
      },
    },
    challenges: {
      screen: EventNavigator,
      navigationOptions: {
        tabBarLabel: <TabBarLabel title="ชาเลนจ์" />,
        tabBarIcon: <Icon icon="challenge" />,
      },
    },
    sendData: {
      screen: SendNavigator,
      navigationOptions: {
        tabBarLabel: <TabBarLabel title="ส่งผลการวิ่ง" style={{ top: 0, fontSize: 10 }} />,
        tabBarIcon: (
          <View style={{ top: -5 }}>
            <Icon icon="runCircle" />
          </View>
        ),
      },
    },
    leaderBoard: {
      screen: LeaderBoardScreen,
      navigationOptions: {
        tabBarLabel: <TabBarLabel title="จัดอันดับ" />,
        tabBarIcon: <Icon icon="rank" />,
      },
    },
    myAccount: {
      screen: AccountNavigator,
      navigationOptions: {
        tabBarLabel: <TabBarLabel title="บัญชีของฉัน" />,
        tabBarIcon: <Icon icon="user" />,
      },
    },
  },
  {
    tabBarComponent: Tabbar,
  },
)
