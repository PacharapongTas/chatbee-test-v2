import React from "react";
import { View, ViewStyle, TextStyle, Text, TouchableWithoutFeedback, ImageStyle } from "react-native"
import { color, spacing } from "../../theme";
import { Icon } from "../icon/icon";
import { ISetNotificationBar } from '../../GlobalContext';

const BAR: ViewStyle = { 
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: 45,
  padding: spacing.small
}

const SUCCESS_BAR: ViewStyle= {
  backgroundColor: color.success,
  
}

const WARNING_BAR: ViewStyle =   {
  backgroundColor: color.warning,
}

const ICON: ImageStyle = {
  marginRight: spacing.normal,
}

const CLOSE_CONTAINER: ViewStyle = {
  position: 'absolute',
  right: 12,
  top: 12,
}

const CLOSE_ICON: ImageStyle = {
  width: 14,
  height: 14
}

const TITLE: TextStyle ={
  fontWeight: '600',
  fontSize: 12,
  color: 'white',
}

interface IProps {
  title: string;
  variant: 'success' | 'warning';
  setNotificationBar: ISetNotificationBar;
}

export const NotificationBar = (props: IProps) => {
  let BAR_THEME, iconName

  switch (props.variant) {
    case 'success':
      BAR_THEME =SUCCESS_BAR
      iconName = 'successCheck'
      break;

    case 'warning':
      BAR_THEME = WARNING_BAR
      iconName = 'warningNotification'
      break;
  
    default:
      break;
  }

  return <View style={{...BAR, ...BAR_THEME}}>
    <Icon style={ICON} icon={iconName} />
  <Text style={TITLE}>{props.title}</Text>
    <TouchableWithoutFeedback onPress={() => props.setNotificationBar('', 'success', false)}>
      <View style={CLOSE_CONTAINER}>
        <Icon style={CLOSE_ICON} icon="whiteClose" />
      </View>
    </TouchableWithoutFeedback>
    </View>
}