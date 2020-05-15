import React from "react"
import { createBottomTabNavigator } from "react-navigation-tabs"

import { Icon } from "../components"
import { MainNavigator } from "./main-navigator"
import { FeedNavigator } from "./feed-navigator"
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
      screen: MainNavigator,
      navigationOptions: {
        tabBarLabel: <TabBarLabel title="ชาเลนจ์" />,
        tabBarIcon: <Icon icon="challenge" />,
      },
    },
  },
  {
    tabBarComponent: Tabbar,
  },
)
