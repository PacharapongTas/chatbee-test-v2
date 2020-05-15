import React, { FunctionComponent, useState, useEffect } from "react"
import { View } from "react-native"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"

import { SendDataTabsProps } from "./types"
import { FULL } from "./styles"
import { Header } from "../header/header"
import { Text } from "../text/text"
import { color } from "../../theme"
import { SendDataScreen2 } from "../../screens"
import { fetchSubmitData } from "../../services/api"
import { ComingSoonScreen } from "../../screens/coming-soon-screen"

export const SendDataTabs2: FunctionComponent<SendDataTabsProps> = ({ navigation }) => {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: "uploadImage", title: "อัพโหลดรูปภาพ" },
      { key: "connectApp", title: "เชื่อมต่อแอปพลิเคชั่น" },
    ],
    showHistory: false,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const submitData = await fetchSubmitData()
    setState({ ...state, showHistory: !!submitData.length })
  }

  const renderScene = SceneMap({
    uploadImage: () => <SendDataScreen2 navigation={navigation} />,
    connectApp: () => <ComingSoonScreen />,
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
      indicatorStyle={{ backgroundColor: color.activeColor }}
      style={{ backgroundColor: color.darkBackground }}
    />
  )

  const goToSendHistoryScreen = () => navigation.navigate("SendHistory")

  return (
    <View style={FULL}>
      <Header
        headerText="ส่งผลการวิ่ง"
        leftIcon="back"
        onLeftPress={() => navigation.goBack()}
        rightIcon={state.showHistory ? "history" : null}
        onRightPress={state.showHistory ? goToSendHistoryScreen : null}
      />
      <TabView
        navigationState={{ index: state.index, routes: state.routes }}
        renderScene={renderScene}
        onIndexChange={index => setState({ ...state, index })}
        renderTabBar={renderTabBar}
      />
    </View>
  )
}
