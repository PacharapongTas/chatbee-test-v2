import { createStackNavigator } from "react-navigation-stack"

import {
  MainScreen,
  SecondScreen,
  // ChallengeDetailScreen,
  // FullChallengeDetailScreen,
  // SocialShareScreen,
  // PaymentScreen,
  InputFormScreen,
  // PaymentSummaryScreen,
  // PaymentMethodScreen,
  // PaymentWebViewScreen,
  // PaymentCompleteScreen,
  // SendResultScreen,
  // SendHistoryScreen,
} from "../screens"


export const MainNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Second: SecondScreen,
    FormInput: InputFormScreen,
  },
  {
    headerMode: "none",
  },
)
