import { connectActionSheet } from '@expo/react-native-action-sheet'
import { createAppContainer } from "react-navigation"

import { RootNavigator } from "./root-navigator"

export const AppContainer = createAppContainer(RootNavigator)
