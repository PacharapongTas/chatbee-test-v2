import React, { useState, useEffect } from "react"
import { View, ViewStyle, ActivityIndicator } from "react-native"
import WebView, { WebViewNavigation } from "react-native-webview"
import { NavigationInjectedProps } from "react-navigation"
import Toast from "react-native-simple-toast"

import { Header } from "../../components"
import { color } from "../../theme"

const CONTAINER: ViewStyle = { flex: 1 }

interface WebViewScreenProps extends NavigationInjectedProps<any> {
  onNavigationStateChange?: (event: WebViewNavigation) => void
}

export const PaymentWebViewScreen: React.FunctionComponent<WebViewScreenProps> = props => {
  const [state, setState] = useState({
    challenge: undefined,
    map: undefined,
    loading: true,
  })
  let webview = null;

  useEffect(() => {
    // @ts-ignore
    const { challenge, map } = props.navigation.state.params
    setState({ ...state, challenge, map, loading: false })
  }, [])

  const onNavigationStateChange = async navState => {
    const reg = new RegExp("/(applications)/[0-9]+/(complete)")
    const validateUrl = reg.test(navState.url)
    if (validateUrl) {
        webview.stopLoading();
        // @ts-ignore
        return props.navigation.replace("PaymentComplete", {
          capture_id: props.navigation.state.params.id,
          challenge: state.challenge,
          map: state.map,
        })
    }
  }

  const onBackPress = () => {
    props.navigation.goBack()
  }

  const renderActivityIndicator = () => (
    <ActivityIndicator size="large" color={color.palette.black} />
  )

  return (
    <View testID="FeedScreen" style={CONTAINER}>
      <Header headerText="CHATBEE" leftIcon="back" onLeftPress={onBackPress} />
      {state.loading ? (
        renderActivityIndicator()
      ) : (
        <WebView
          {...props}
          ref={ref => (webview = ref)}
          source={{ uri: props.navigation.getParam("payment").authorize_uri }}
          onNavigationStateChange={onNavigationStateChange}
        />
      )}
    </View>
  )
}
