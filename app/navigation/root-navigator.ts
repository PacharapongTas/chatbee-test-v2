import { createStackNavigator } from "react-navigation-stack"

import { DemoScreen, AuthLoadingScreen, AuthScreen, LinkFacebookScreen } from "../screens"
import { HomeNavigator } from "./home-navigator"

// TODO remove and try to run
export default createStackNavigator({
  Demo: DemoScreen,
})

export const RootNavigator = createStackNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: AuthScreen,
    LinkFacebook: LinkFacebookScreen,
    App: HomeNavigator,
  },
  {
    headerMode: "none",
    defaultNavigationOptions: {
      animationEnabled: false
    }
  },
)
