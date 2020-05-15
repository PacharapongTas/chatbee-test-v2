import { createStackNavigator } from "react-navigation-stack"

import {
  MainScreen,
  SecondScreen,
  InputFormScreen,
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
