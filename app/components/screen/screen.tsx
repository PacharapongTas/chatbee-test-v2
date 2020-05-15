import * as React from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native"
import { SafeAreaView } from "react-navigation"

import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { color } from "../../theme"

const isIos = Platform.OS === "ios"

const renderActivityIndicator = () => (
  <View style={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color={color.palette.white} />
  </View>
)

function ScreenWithoutScrolling(props: ScreenProps) {
  const preset = presets["fixed"]
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const Wrapper = props.unsafe ? View : SafeAreaView

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <Wrapper style={[preset.inner, style]}>
        {props.loading ? renderActivityIndicator() : props.children}
      </Wrapper>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    props.onRefresh().then(() => setRefreshing(false))
  }, [refreshing])

  const preset = presets["scroll"]
  const style = props.style || {}
  const backgroundStyle = {
    backgroundColor: props.backgroundColor ? props.backgroundColor : color.transparent,
  }
  const Wrapper = props.unsafe ? View : SafeAreaView
  const refreshControl = props.onRefresh
    ? Platform.OS === "android"
      ? {
          refreshControl: (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[color.palette.white]}
              progressBackgroundColor={color.palette.black}
            />
          ),
        }
      : {
          refreshControl: (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={color.palette.white}
            />
          ),
        }
    : {}

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar barStyle={props.statusBar || "light-content"} />
      <Wrapper style={[preset.outer, backgroundStyle]}>
        {props.loading ? (
          renderActivityIndicator()
        ) : (
          <ScrollView
            style={[preset.outer, backgroundStyle]}
            contentContainerStyle={[preset.inner, style]}
            {...refreshControl}
          >
            {props.children}
          </ScrollView>
        )}
      </Wrapper>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
