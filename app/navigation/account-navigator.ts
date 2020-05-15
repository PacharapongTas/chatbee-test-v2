import { createStackNavigator } from "react-navigation-stack"

import { MyAccountScreen, SettingsScreen, EditProfileScreen, FAQScreen, WebViewScreen } from "../screens"
import { PolicyScreen } from "../screens/policy-screen"

export const AccountNavigator = createStackNavigator(
  {
    MyAccount: MyAccountScreen,
    Settings: SettingsScreen,
    EditProfile: EditProfileScreen,
    FAQ: FAQScreen,
    Policy: PolicyScreen,
    WebView: WebViewScreen,
  },
  {
    headerMode: "none",
  },
)
