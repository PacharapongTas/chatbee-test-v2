import { createStackNavigator } from "react-navigation-stack"

import {
  EventsScreen,
  ChallengesScreen,
  ChallengeDetailScreen,
  FullChallengeDetailScreen,
  SocialShareScreen,
  PaymentScreen,
  PaymentFormScreen,
  PaymentSummaryScreen,
  PaymentMethodScreen,
  PaymentWebViewScreen,
  PaymentCompleteScreen,
  SendResultScreen,
  SendHistoryScreen,
} from "../screens"
import { SendDataTabs1, SendDataTabs2 } from "../components"
import { PolicyScreen } from "../screens/policy-screen"

export const EventNavigator = createStackNavigator(
  {
    Events: EventsScreen,
    Challenges: ChallengesScreen,
    ChallengeDetail: {
      screen: ChallengeDetailScreen,
      path: 'challengeDetail/:challengeId'
    },
    ChallengeFullDetail: FullChallengeDetailScreen,
    SocialShareScreen: SocialShareScreen,
    Payment: PaymentScreen,
    PaymentForm: PaymentFormScreen,
    PaymentSummary: PaymentSummaryScreen,
    PaymentMethod: PaymentMethodScreen,
    PaymentWebView: PaymentWebViewScreen,
    PaymentComplete: PaymentCompleteScreen,
    SendForm: SendDataTabs1,
    SendConfirm: SendDataTabs2,
    SendResult: SendResultScreen,
    SendHistory: SendHistoryScreen,
    PaymentPolicy: PolicyScreen,
  },
  {
    headerMode: "none",
  },
)
