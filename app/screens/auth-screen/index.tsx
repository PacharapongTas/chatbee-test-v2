import appleAuth, { AppleAuthError, AppleAuthRequestOperation, AppleAuthRequestScope, AppleButton } from '@invertase/react-native-apple-authentication';
import React, { useState } from "react";
import { Image, SafeAreaView, StatusBar, View, ViewStyle } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import Mixpanel from 'react-native-mixpanel';
import { Icon, Screen, Text, Wallpaper } from "../../components";
import { PrimaryButton } from "../../components/button/primary-button";
import { NotificationBar } from '../../components/notification-bar';
import { useNotificationBarContext } from '../../GlobalContext';
import { authWithApple, authWithFacebook } from "../../services/api";
import { spacing } from '../../theme';
import { BUTTON, BUTTON_TEXT, FOOTER, FULL, ICON, IMAGE, IMAGE_CONTAINER, SCREEN } from "./styles";


const backgroundImageOverlay = require("../../assets/images/background-wirtual.png")
const wirtaulSquareLogo = require("../../assets/logos/wirtual-horizontal-logo.png")

const APPLE_STYLE: ViewStyle = {
  width: '100%',
  height: 50,
  borderRadius: 25,
  overflow: 'hidden',
  marginBottom: spacing.normal
}

export const AuthScreen = ({ navigation }) => {
  const [notificationBar, setNotificationBar] = useNotificationBarContext()
  const [state, setState] = useState({
    spinner: false,
  })

  const loginWithFacebook = async () => {
    // Send and event name with no properties
    Mixpanel.track("Login with Facebook");
    try {
      await setState({ ...state, spinner: true })
      const data = await authWithFacebook()
      
      Mixpanel.identify(data.user.username)
      navigation.replace("App")
      await setState({ ...state, spinner: false })
    } catch (e) {
      setNotificationBar(e.detail, 'warning', true)
    } finally {
      await setState({ ...state, spinner: false })
    }
  }

  async function onAppleButtonPress() {

    // TODO: if facebook_id exist, go to app

    Mixpanel.track("Login with Apple");
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
      });

      const {
        authorizationCode,
        fullName
      } = appleAuthRequestResponse;

        try {
          await setState({ ...state, spinner: true })
          const data = await authWithApple(authorizationCode, fullName.givenName, fullName.familyName)
          Mixpanel.identify(data.user.username)

          if (!data.user.user_profile.facebook_id) {
    navigation.replace("LinkFacebook")
          } else {
            navigation.replace("App")
          }
        } catch (e) {
          setNotificationBar(e.detail, 'warning', true)
        } finally {
          await setState({ ...state, spinner: false })
        }
    } catch (error) {
      if (error.code === AppleAuthError.CANCELED) {
        console.warn('User canceled Apple Sign in.');
      } else {
        console.error(error);
      }
    }
  }

  return (
    <View style={FULL}>
      <StatusBar backgroundColor="transparent" translucent />
      {notificationBar.visible ? <View style={{position: 'absolute', top: 40, left:0,right: 0}}><NotificationBar {...notificationBar} setNotificationBar={setNotificationBar} /></View> : null}
      <Wallpaper backgroundImage={backgroundImageOverlay} />
      <Screen preset="scroll" style={SCREEN}>
        <View style={IMAGE_CONTAINER}>
          <Image source={wirtaulSquareLogo} style={IMAGE} />
        </View>
      </Screen>
      <SafeAreaView>
        <View style={FOOTER}>
        {appleAuth.isSupported && <AppleButton
            style={APPLE_STYLE}
            cornerRadius={5}
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.LOGIN}
            onPress={() => onAppleButtonPress()}
          />}
          <PrimaryButton style={BUTTON} onPress={loginWithFacebook}>
            <Icon icon="facebook" containerStyle={ICON} />
            <Text style={BUTTON_TEXT}>เข้าสู่ระบบด้วย Facebook</Text>
          </PrimaryButton>
        </View>
      </SafeAreaView>
      <Spinner visible={state.spinner} />
    </View>
  )
}
