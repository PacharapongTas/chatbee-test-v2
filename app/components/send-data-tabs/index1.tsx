import React, { FunctionComponent, useState } from "react"
import { View } from "react-native"
import { SceneMap, TabBar, TabView } from "react-native-tab-view"
import { SendDataScreen1 } from "../../screens"
import { ComingSoonScreen } from "../../screens/coming-soon-screen"
import { color } from "../../theme"
import { Text } from "../text/text"
import { SendDataHeader } from "./header"
import { FULL } from "./styles"
import { SendDataTabsProps } from "./types"


export const SendDataTabs1: FunctionComponent<SendDataTabsProps> = ({ navigation }) => {
  const [state, setState] = useState({
    index: 0,
    routes: [
      { key: "uploadImage", title: "อัพโหลดรูปภาพ" },
      { key: "connectApp", title: "เชื่อมต่อแอปพลิเคชั่น" },
    ],
  })

  const renderScene = SceneMap({
    uploadImage: () => <SendDataScreen1 navigation={navigation} />,
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

  return (
    <View style={FULL}>
      <SendDataHeader
        navigation={navigation}
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
