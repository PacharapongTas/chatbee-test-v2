import { createStackNavigator } from "react-navigation-stack"

import { SendDataTabs1, SendDataTabs2 } from "../components"
import { SendResultScreen, SendHistoryScreen } from "../screens"

export const SendNavigator = createStackNavigator(
  {
    SendForm: SendDataTabs1,
    SendConfirm: SendDataTabs2,
    SendResult: SendResultScreen,
    SendHistory: SendHistoryScreen,
  },
  {
    headerMode: "none",
  },
)
