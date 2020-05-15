import { createStackNavigator } from "react-navigation-stack"

import { FeedScreen, WebViewScreen } from "../screens"

export const FeedNavigator = createStackNavigator(
  {
    Feed: FeedScreen,
    WebView: WebViewScreen,
  },
  {
    headerMode: "none",
  },
)
