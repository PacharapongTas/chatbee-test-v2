import React, { useState } from "react";
import { StatusBar, View, ViewStyle } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Icon, Screen, Text, Wallpaper } from "../../components";
import { PrimaryButton } from "../../components/button/primary-button";
import { NotificationBar } from '../../components/notification-bar';
import { useNotificationBarContext } from '../../GlobalContext';
import { spacing } from '../../theme';
import { FOOTER, BUTTON_TEXT, FULL,BUTTON, SCREEN } from "./styles";
import { linkFacebook } from "../../services/api";


const backgroundImageOverlay = require("../../assets/images/background-wirtual.png")
const wirtaulSquareLogo = require("../../assets/logos/wirtual-horizontal-logo.png")

const APPLE_STYLE: ViewStyle = {
  width: '100%',
  height: 50,
  borderRadius: 25,
  overflow: 'hidden',
  marginBottom: spacing.normal
}

export const LinkFacebookScreen = ({ navigation }) => {
  const [notificationBar, setNotificationBar] = useNotificationBarContext()
  const [state, setState] = useState({
    spinner: false,
  })

  const loginWithFacebook = async () => {
    try {
      await setState({ ...state, spinner: true })
      await linkFacebook()
      navigation.replace("App")
      await setState({ ...state, spinner: false })
    } catch (e) {
      setNotificationBar(e.detail, 'warning', true)
    } finally {
      await setState({ ...state, spinner: false })
    }
  }

  return (
    <View style={FULL}>
      <StatusBar backgroundColor="transparent" translucent />
      {notificationBar.visible ? <View style={{position: 'absolute', top: 40, left:0,right: 0}}><NotificationBar {...notificationBar} setNotificationBar={setNotificationBar} /></View> : null}
      <Wallpaper backgroundImage={backgroundImageOverlay} />
      <Screen preset="scroll" style={SCREEN}>
        <View style={{paddingTop: '50%'}}>
          <View style={{display: 'flex', alignItems: 'center'}}>
          <Icon style={{marginBottom: spacing.large}} icon="network" />
          </View>
        <Text style={{fontSize: 24, textAlign: 'center',fontWeight: 'bold', color: 'white', marginBottom: spacing.normal}}>เชื่อมต่อกับเพื่อนของคุณ</Text>
        <Text style={{fontSize: 14, textAlign: 'center', color: 'white', marginBottom: spacing.huge}}>เพื่อให้เราเชื่อมต่อกับเพื่อนของคุณ</Text>
        <View style={FOOTER}>
          <PrimaryButton style={BUTTON} onPress={loginWithFacebook}>
            <Text style={BUTTON_TEXT}>เชื่อมต่อกับ Facebook ของคุณ</Text>
          </PrimaryButton>
        </View>
        </View>

      </Screen>

      <Spinner visible={state.spinner} />
    </View>
  )
}
