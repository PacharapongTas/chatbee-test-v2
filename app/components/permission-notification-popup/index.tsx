import React from "react";
import { Popup } from "../popup";
import { Text, TouchableOpacity, View, TextStyle, ViewStyle, ImageStyle } from "react-native";
import { PrimaryButton } from "../button/primary-button";
import { Icon } from "../icon/icon";
import { spacing } from "../../theme";

const ICON: ImageStyle = {
  marginBottom: spacing.normal,
  height: 93,
}

const TITLE_CONTAINER: ViewStyle = {
  marginBottom: spacing.normal,
}

const TITLE: TextStyle = {
  fontSize: 20,
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
}

const DESCRIPTION: TextStyle = {
  fontSize: 14,
  color: 'white',
  textAlign: 'center',
  marginBottom: spacing.large,
}

const SUBMIT_BUTTON: ViewStyle = {
  marginBottom: spacing.normal,
  width: '100%'
}

interface IProps {
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export function PermissionNotificationPopup({visible, onSubmit, onCancel}: IProps) {
  return (
    <Popup 
    visible={visible}
    onCancel={onCancel}
  >
    <View style={{display: 'flex', alignItems: 'center'}}>
    <Icon style={ICON} icon="notification" />
    <View style={TITLE_CONTAINER}>
      <Text style={TITLE}>เปิด Notification</Text>
      <Text style={TITLE}>เพื่อรับโปรโมชั่นดีๆก่อนใคร</Text>
    </View>
    <Text style={DESCRIPTION}>ไม่พลาดทุกชาเลนจ์สำคัญ เราสัญญาว่าจะส่งมอบแต่สิ่งดีๆ ให้กับคุณผ่านระบบ Push Notification ง่ายๆ เพียงแค่กดปุ่มด้านล่างนี้</Text>
    <View style={SUBMIT_BUTTON}>
    <PrimaryButton style={{height: 50}} onPress={onSubmit}><Text style={{color: 'white',fontSize: 15, fontWeight: '500'}}>ตกลง</Text></PrimaryButton>
    </View>
    <TouchableOpacity onPress={onCancel}><Text style={{color: 'white', opacity: 0.7}}>ไม่, เดี๋ยวกลับมาเปิดทีหลัง</Text></TouchableOpacity>
    </View>
  </Popup>
  )
}