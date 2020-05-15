import messaging from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-community/async-storage"
import React, { useEffect, useState } from "react"
import { Dimensions, FlatList, StatusBar, View, ViewStyle, Platform } from "react-native"
import { Header, Screen } from "../../components"
import { FeedCard } from "../../components/feed-card"
import { PermissionNotificationPopup } from "../../components/permission-notification-popup"
import { fetchFeeds, sendFcmToken } from "../../services/api"
import { color, spacing } from "../../theme"

const KEY_DID_SHOW_WELCOME_POPUP = "didShowWelcomePopup-v2"

enum WelcomePopupStep {
  REQUEST_PUSH_PERMISSION = 1,
  ONBOARDING
}

const SCREEN_HORIZONTAL_PADDING = spacing.medium

const FULL: ViewStyle = {
  flex: 1,
}

const CONTENT: ViewStyle = {
  paddingHorizontal: SCREEN_HORIZONTAL_PADDING,
}

const SPACER: ViewStyle = {
  height: spacing.smaller,
}

export const FeedScreen = ({ navigation }) => {
  const [welcomePopupStep, setWelcomePopupStep] = useState(0)
  const [state, setState] = useState({
    loading: true,
    feeds: [],
    hasNext: false,
    pageNumber: 1,
    pageSize: 3,
  })

  useEffect(() => {
    getRegistrationToken()
    fetchData(state.pageNumber)
    showWelcomePopup()
  }, [])

  const getRegistrationToken = async () => {
    const token = await messaging().getToken();
    console.log(token);

    try {
      await sendFcmToken(
        {
          registration_id: token,
          active: true,
          type: Platform.OS
        }
      )  
    } catch (error) {
      console.log(error);
    }
    
  }

  const shouldShowRequestPushPermission = async () => {
    if (Platform.OS !== 'ios')  {
      return false
    }

    const authorizationStatus = await messaging().hasPermission();
    return authorizationStatus === messaging.AuthorizationStatus.NOT_DETERMINED || authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
  }

  const shouldShowOnboarding = async () => {
    const didShowWelcomePopup = await AsyncStorage.getItem(KEY_DID_SHOW_WELCOME_POPUP)
    return !didShowWelcomePopup
  }

  const showWelcomePopup = async () => {
    const shouldShowRequestPopup = await shouldShowRequestPushPermission()
    if (shouldShowRequestPopup) {
      setWelcomePopupStep(WelcomePopupStep.REQUEST_PUSH_PERMISSION)
    } else {
      showOnboardingElseClose()
    }
  }

  const showOnboardingElseClose = async () => {
    const shouldShow = await shouldShowOnboarding()
    if (shouldShow) {
      AsyncStorage.setItem(KEY_DID_SHOW_WELCOME_POPUP, "true")
      setWelcomePopupStep(WelcomePopupStep.ONBOARDING)
    } else {
      setWelcomePopupStep(0)
    }
  }

  const fetchData = async page => {
    const { links, results } = await fetchFeeds({
      page,
      page_size: state.pageSize,
    })
    setState({ ...state, feeds: results, hasNext: !!links.next, pageNumber: page, loading: false })
  }

  const onClickRequestPermissions = async () => {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus) {
      console.log('Permission status:', authorizationStatus);
    }

    showOnboardingElseClose()
  }

  const onClickJoinChallenge = () => {
    setWelcomePopupStep(0)

    // challengeId is Bangkok ChatBee Run (mini)
    navigation.navigate("ChallengeDetail", { challengeId: 1 })
  }

  return (
    <View style={FULL}>
      <PermissionNotificationPopup
        visible={welcomePopupStep === WelcomePopupStep.REQUEST_PUSH_PERMISSION}
        onSubmit={onClickRequestPermissions}
        onCancel={async () => showOnboardingElseClose()}
      />

      <StatusBar backgroundColor="transparent" translucent />
      <Header headerText="ข่าวสาร" />
      <Screen backgroundColor={color.palette.surface_main} loading={state.loading}>
        <FlatList
          data={state.feeds}
          renderItem={({ item, index }) => (
            <FeedCard
              width={Dimensions.get("window").width - SCREEN_HORIZONTAL_PADDING * 2}
              navigation={navigation}
              url={item.url}
              imageSrc={{ uri: item.picture.image }}
              index={index}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.4}
          onEndReached={() => (state.hasNext ? fetchData(state.pageNumber + 1) : null)}
          style={CONTENT}
        />
        <View style={SPACER} />
      </Screen>
    </View>
  )
}
