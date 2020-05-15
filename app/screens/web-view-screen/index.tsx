import React from "react"
import { View, ViewStyle } from "react-native"
import { WebView, WebViewNavigation } from "react-native-webview"
import { NavigationInjectedProps } from "react-navigation"

import { Header } from "../../components"

const CONTAINER: ViewStyle = { flex: 1 }

export interface WebViewScreenProps extends NavigationInjectedProps<any> {
  onNavigationStateChange?: (event: WebViewNavigation) => void;
}

export const WebViewScreen: React.FunctionComponent<WebViewScreenProps> = ({ navigation, onNavigationStateChange }) => {
  const onBackPress = () => {
    navigation.goBack()
  }

  const title = navigation.getParam("title") ? navigation.getParam("title") : ''

  return (
    <View testID="FeedScreen" style={CONTAINER}>
      <Header headerText={title} leftIcon="back" onLeftPress={onBackPress} />
      <WebView 
        source={{ uri: navigation.getParam("uri") }}
        onNavigationStateChange={onNavigationStateChange}
      />
    </View>
  )
}
