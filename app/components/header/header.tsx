import * as React from "react"
import { View, ViewStyle, TextStyle } from "react-native"

import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Icon } from "../icon/icon"
import { Text } from "../text/text"
import { spacing, color } from "../../theme"
import { translate } from "../../i18n/"
import { NotificationBar } from "../notification-bar"
import { GlobalContext, useNotificationBarContext } from "../../GlobalContext"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: spacing.normal,
  alignItems: "center",
  paddingTop: spacing.huge,
  paddingBottom: spacing.normal,
  justifyContent: "flex-start",
  backgroundColor: color.palette.mirrage,
}
const TITLE: TextStyle = { textAlign: "center", fontSize: 18, fontWeight: "bold" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: 32, height: 32 }
const RIGHT: ViewStyle = { width: 32, height: 32 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export const Header: React.FunctionComponent<HeaderProps> = props => {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  const [notificationBar, setNotificationBar] = useNotificationBarContext()


  return (
    <React.Fragment>
    <View style={{ ...ROOT, ...style }}>
      {leftIcon ? (
        <Button preset="link" onPress={onLeftPress} style={LEFT}>
          <Icon icon={leftIcon} />
        </Button>
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={{ ...TITLE, ...titleStyle }} text={header} />

      </View>
      {rightIcon ? (
        <Button preset="link" onPress={onRightPress} style={RIGHT}>
          <Icon icon={rightIcon} />
        </Button>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
    {notificationBar.visible ? <NotificationBar {...notificationBar} setNotificationBar={setNotificationBar} /> : null}
    </React.Fragment>
  )
}
