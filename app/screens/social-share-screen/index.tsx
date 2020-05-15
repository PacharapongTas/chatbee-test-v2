import React, { Component } from "react"
import { View, ViewStyle, Image, Alert, Linking } from "react-native"
import { ShareDialog } from "react-native-fbsdk"
import ViewShot from "react-native-view-shot"
import Share from "react-native-share"
import CameraRoll from "@react-native-community/cameraroll"
import moment from "moment"

import { Screen, Header, Text } from "../../components"
import { spacing, color } from "../../theme"
import { Map } from "../../components/map"
import { Progress } from "./progress"
import { ShareButton } from "./share-button"
import { getMyChallengeStatistic } from "../../services/api"

const logo = require("../../assets/logos/wirtual-horizontal-logo.png")

const CONTAINER: ViewStyle = {
  flex: 1,
}

const CONTENT: ViewStyle = {
  padding: spacing.medium,
}

const SHARE_COLUMN: ViewStyle = {
  flexDirection: "row",
  flex: 0.33,
  justifyContent: "center",
}

const ERROR_MSG = {
  PHOTO_ACESS_DENIED: "Access to photo library was denied",
  USER_NOT_SHARE: "User did not share",
  OPERATION_CANCEL: "The operation was cancelled.",
}

export class SocialShareScreen extends Component {
  state = {
    myStatistic: null,
    isLoading: false,
  }

  async componentDidMount() {
    // @ts-ignore
    const { challenge } = this.props.navigation.state.params
    const { my_statistic } = await getMyChallengeStatistic(challenge.id)
    this.setState({ myStatistic: my_statistic })
  }

  shareToFacebook = async () => {
    // @ts-ignore
    const imageUrl = await this.refs.viewShot.capture()

    const content = {
      contentType: "photo",
      photos: [{ imageUrl }],
    }

    ShareDialog.canShow(content).then(canShow => {
      if (canShow) {
        this.setState({ isLoading: true })
        return ShareDialog.show(content)
          .then(result => {
            if (!result.isCancelled) {
              this.onCompleted()
            }
            this.setState({ isLoading: false })
          })
          .catch(this.onError)
      }
    })
  }

  shareToInstagram = async () => {
    // @ts-ignore
    const imageUrl = await this.refs.viewShot.capture()

    this.setState({ isLoading: true })

    CameraRoll.saveToCameraRoll(imageUrl)
      .then(path => {
        const shareOptions = {
          url: path,
          social: Share.Social.INSTAGRAM,
        }

        return Share.shareSingle(shareOptions)
          .then(() => this.onCompleted())
          .catch(this.onError)
      })
      .catch(this.onError)
  }

  moreShareOption = async () => {
    // @ts-ignore
    const imageUrl = await this.refs.viewShot.capture()

    this.setState({ isLoading: true })

    const shareOptions = {
      url: imageUrl,
    }

    return Share.open(shareOptions)
      .then(() => this.onCompleted())
      .catch(this.onError)
  }

  onCompleted() {
    Alert.alert("Success", "Shared Successfully!")
    this.setState({ isLoading: false })
  }

  onError = error => {
    if (error.message === ERROR_MSG.PHOTO_ACESS_DENIED) {
      return this.onPermissionDenied()
    }

    if (
      error.message !== ERROR_MSG.USER_NOT_SHARE &&
      ((error || {}).error || {}).message !== ERROR_MSG.OPERATION_CANCEL
    ) {
      let message = ""

      if (error.message) {
        message = error.message
      }
      if ((error.error || {}).message) {
        message = error.error.message
      }

      Alert.alert("Error", message)
    }

    return this.setState({ isLoading: false })
  }

  onPermissionDenied() {
    Alert.alert("Requires Access", "This app requires access to the photo library.", [
      { text: "Setting", onPress: () => Linking.openSettings() },
      {
        text: "Cancel",
        style: "cancel",
      },
    ])
    this.setState({ isLoading: false })
  }

  render() {
    const { myStatistic, isLoading } = this.state
    // @ts-ignore
    const { navigation } = this.props
    const { challenge, map } = navigation.state.params
    return (
      <View style={CONTAINER}>
        <Header headerText="Sharing" leftIcon="back" onLeftPress={() => navigation.goBack()} />
        <Screen
          preset="scroll"
          backgroundColor={color.palette.surface_main}
          style={CONTENT}
          loading={isLoading}
        >
          <View>
            <ViewShot ref="viewShot" options={{ format: "jpg", quality: 1 }}>
              <View
                style={{
                  backgroundColor: color.palette.bigStone,
                  paddingHorizontal: spacing.medium,
                  paddingVertical: spacing.large,
                }}
              >
                <Image source={logo} style={{ width: 120, height: 30 }} resizeMode="contain" />
                <Map event={challenge.event} {...map} />
                <Progress
                  distance={myStatistic ? myStatistic.total_distance / 1000 : 0}
                  totalDistance={challenge.distance / 1000}
                  eventTitle={challenge.event.name}
                  totalTime={
                    myStatistic
                      ? moment(myStatistic.total_time, "HH:mm:ss").format("HH.mm.ss")
                      : "00.00.00"
                  }
                  avgTime={
                    myStatistic
                      ? moment(myStatistic.average_time, "HH:mm:ss").format('mm"ss"')
                      : '0"00"'
                  }
                />
              </View>
            </ViewShot>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: spacing.large,
              marginBottom: spacing.medium,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>เลือกช่องทางการแชร์</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <View style={SHARE_COLUMN}>
              <ShareButton title="Facebook" icon="circleFacebook" onPress={this.shareToFacebook} />
            </View>
            <View style={SHARE_COLUMN}>
              <ShareButton
                title="Instagram"
                icon="circleInstagram"
                onPress={this.shareToInstagram}
              />
            </View>
            <View style={SHARE_COLUMN}>
              <ShareButton title="More" icon="circleMessenger" onPress={this.moreShareOption} />
            </View>
          </View>
        </Screen>
      </View>
    )
  }
}
