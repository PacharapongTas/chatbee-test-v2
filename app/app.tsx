import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { firebase } from '@react-native-firebase/analytics';
import React, { useEffect, useState } from "react";
import { AppRegistry } from "react-native";
import messaging from '@react-native-firebase/messaging';
import Config from "react-native-config"
import "react-native-gesture-handler";
import Mixpanel from 'react-native-mixpanel';
import "./i18n";
import { AppContainer } from "./navigation/app-container";
import { GlobalContext, IGlobalContext } from './GlobalContext';

firebase.analytics()

// Init Mixpanel SDK with your project token
//  @param apiToken - your project token
Mixpanel.sharedInstanceWithToken(Config.MIXPANEL_TOKEN);

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

export const App: React.FunctionComponent<{}> = () => {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Message handled in the foreground!', remoteMessage);
    });

    return unsubscribe;
  }, []);
  
  const [globalContext, setGlobalContext] = useState<IGlobalContext>({
    notificationBar: {
      title: '',
      visible: false,
      variant: 'success'
    }
  });

  const prefix = 'wirtual://'

  return  <ActionSheetProvider>
  <GlobalContext.Provider value={[globalContext, setGlobalContext]}>
        <AppContainer uriPrefix={prefix} />
      </GlobalContext.Provider>
      </ActionSheetProvider>
}

const APP_NAME = "Wirtual"

AppRegistry.registerComponent(APP_NAME, () => App)
