import AutoHeightWebView from 'react-native-autoheight-webview'
import React, { Fragment, FunctionComponent, useEffect, useState } from "react";
import { Dimensions, Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import HTML from 'react-native-render-html';
import NumberFormat from "react-number-format";
import { Header, ImageModal, Screen, Text } from "../../components";
import { ActivityIndicatorWithContainer } from '../../components/activity-indicator-with-container';
import { PrimaryButton } from "../../components/button/primary-button";
import { Map } from "../../components/map";
import { IMapProps } from "../../components/map/map.props";
import { useNotificationBarContext } from '../../GlobalContext';
import { createApplication, getChallenge, getMap, KEY_TOKEN } from "../../services/api";
import { CHALLENGE_TYPES } from "../../utils/constants";
import { BUTTON, BUTTON_TEXT, CONTAINER, FLEX_CONTAINER, FLEX_ITEM, FLEX_SUBTITLE, FLEX_TITLE, FULL, HORIZONTAL_DIVIDER, REWARD_CARD, REWARD_CONTAINER, REWARD_IMAGE, REWARD_SUBTITLE, REWARD_TITLE, SCREEN, SPACER, SUBTITLE, TITLE } from "./styles";
import { ChallengeDetailScreenProps, RewardCardProps } from "./types";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions, NavigationActions } from "react-navigation";
import { spacing, color } from "../../theme"

interface IState {
  loading: boolean,
  submitLoading: boolean,
  challenge: any,
  map: IMapProps | null,
  modalImageSrc: any,
}

export const ChallengeDetailScreen: FunctionComponent<ChallengeDetailScreenProps> = ({
  navigation,
}) => {
  const [_, setNotificationBar] = useNotificationBarContext()
  const [state, setState] = useState<IState>({
    loading: true,
    submitLoading: false,
    challenge: null,
    map: null,
    modalImageSrc: null,
  })

  useEffect(() => {
    logoutIfNotLoggedIn()
    // @ts-ignore
    const challengeId = navigation.getParam("challengeId")
    Promise.all([getChallenge(challengeId), getMap(challengeId)]).then(([challenge, map]) => {
      setState({
        ...state,
        loading: false,
        challenge: challenge,
        map: challengeMap(map),
      })
    })
  }, [])

  const logoutIfNotLoggedIn = async () => {
    const token = await AsyncStorage.getItem(KEY_TOKEN)
    if (!token) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "AuthLoading" })],
      })
      navigation.dispatch(resetAction)
    }
  }

  const challengeMap = rawData => ({
    svg: {
      dash: rawData.svg.dash,
      transform: {
        translateX: rawData.svg.translateX,
        translateY: rawData.svg.translateY,
      },
    },
    totalDistance: rawData.total_distance / 1000,
    numberOfCheckPoint: 0,
    friendProgresses: rawData.friend_progresses.map(item => ({
      distance: item.distance / 1000,
      imageUrl: item.image_url,
    })),
    myProgress: {
      distance: rawData.my_progress.distance / 1000,
      imageUrl: rawData.my_progress.image_url,
    },
  })

  const goToPreviousScreen = () => navigation.goBack()

  const onPressRegister = async () => {
    if (state.challenge.price <= 0) {
      try {
        setState({
          ...state,
          submitLoading: true
        })
        await createApplication({
          challenge_id: state.challenge.id,
          delivery_id: 1,
          first_name: "-",
          last_name: "-",
          address: "-",
          city: "-",
          district: "-",
          sub_district: "-",
          postal_code: "-",
          email: "-",
          phone_number: "-",
          shirt_size: "-",
        })
        setNotificationBar('คุณลงสมัครสำเร็จ', 'success', true)

        navigation.navigate("ChallengeFullDetail", { challengeId: state.challenge.id })
       } catch (error) {
          setNotificationBar(error.detail, 'warning', true)
        } finally {
          setState({
            ...state,
            submitLoading: false
          })
        }
    } else {
      navigation.navigate("Payment", { challenge: state.challenge, map: state.map })
    }
  }

  const navigateTo = routeName => () =>
    navigation.navigate(routeName, { challenge: state.challenge, map: state.map })

  const renderRewardCard = ({ key, imageSrc, title, subtitle }: RewardCardProps) => (
    <TouchableOpacity
      key={key}
      style={REWARD_CARD}
      onPress={() => setState({ ...state, modalImageSrc: imageSrc })}
    >
      <Image style={REWARD_IMAGE} source={imageSrc} />
      <Text style={REWARD_TITLE}>{title}</Text>
      {subtitle ? <Text style={REWARD_SUBTITLE}>{subtitle}</Text> : null}
    </TouchableOpacity>
  )

  return (
    <View style={FULL}>
      <Header
        headerText={state.challenge ? CHALLENGE_TYPES[state.challenge.type.toString()] : ""}
        leftIcon="back"
        onLeftPress={goToPreviousScreen}
        rightIcon="export"
        onRightPress={navigateTo("SocialShareScreen")}
      />
      <Screen preset="scroll" loading={state.loading} style={SCREEN}>
        {state.challenge && (
          <Fragment>
            <View style={CONTAINER}>
              <Text style={TITLE}>{CHALLENGE_TYPES[state.challenge.type.toString()]}</Text>
              {state.map && <Map event={state.challenge.event} {...state.map} />}
            </View>
            <View style={HORIZONTAL_DIVIDER} />
            <View style={FLEX_CONTAINER}>
              <View style={FLEX_ITEM}>
                <NumberFormat
                  value={state.challenge.distance / 1000}
                  displayType="text"
                  decimalScale={0}
                  thousandSeparator
                  suffix=" km"
                  renderText={text => <Text style={FLEX_TITLE}>{text}</Text>}
                />
                <Text style={FLEX_SUBTITLE}>ระยะทาง</Text>
              </View>
            </View>
            <View style={HORIZONTAL_DIVIDER} />
            <View style={CONTAINER}>
              <Text style={TITLE}>รายละเอียดชาเลนจ์</Text>
              {/* <Text style={SUBTITLE}>
                {state.challenge.event && state.challenge.event.description
                  ? state.challenge.event.description
                  : null}
              </Text> */}
              {state.challenge.event && state.challenge.event.description && 
                // <ScrollView style={{ flex: 1 }}>
                <HTML 
                tagsStyles={{
                  strong: {fontWeight: 'bold',},
                  p: {fontWeight: '300', marginTop: spacing.smaller, marginBottom: spacing.smaller},
                  span: {fontWeight: '300', marginTop: spacing.smaller,marginBottom: spacing.smaller}
                }}
                html={state.challenge.event.description} 
                imagesInitialDimensions={{width: 400, height: 400}} 
                imagesMaxWidth={Dimensions.get('window').width - spacing.large} />
                // </ScrollView>
              }
              {state.challenge && state.challenge.rewards.length ? (
                <Fragment>
                  <View style={SPACER} />
                  <Text style={TITLE}>รางวัล</Text>
                  <Text style={SUBTITLE}>นี่คือของรางวัลที่คุณจะได้รับเมื่อชนะชาเลนจ์นี้</Text>
                  <View style={REWARD_CONTAINER}>
                    {state.challenge.rewards.map((reward, index) =>
                      renderRewardCard({
                        key: index,
                        imageSrc: { uri: reward.picture.image },
                        title: reward.name,
                        subtitle: reward.amount ? `จำนวน ${reward.amount} ชิ้น` : '',
                      }),
                    )}
                  </View>
                </Fragment>
              ) : null}
            </View>
          </Fragment>
        )}
      </Screen>
      {!state.loading ? (
        <View style={BUTTON}>
          <PrimaryButton
            onPress={onPressRegister}
          >
            {state.submitLoading ? <ActivityIndicatorWithContainer /> : <Text style={BUTTON_TEXT}>ลงสมัคร</Text>}
          </PrimaryButton>
        </View>
      ) : null}
      <ImageModal
        imageSrc={state.modalImageSrc}
        visible={!!state.modalImageSrc}
        onClose={() => setState({ ...state, modalImageSrc: null })}
      />
    </View>
  )
}
