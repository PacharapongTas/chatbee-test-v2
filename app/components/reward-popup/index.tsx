import React from "react";
import { ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native";
import { spacing } from "../../theme";
import { PrimaryButton } from "../button/primary-button";
import { Icon } from "../icon/icon";
import { Popup } from "../popup";

const ICON: ImageStyle = {
  marginBottom: spacing.normal,
  width: 95,
}

const TITLE_CONTAINER: ViewStyle = {
  marginBottom: spacing.normal,
}

const TITLE: TextStyle = {
  fontSize: 24,
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
}

const DESCRIPTION: TextStyle = {
  fontSize: 14,
  color: 'white',
  textAlign: 'center',
  marginBottom: spacing.normal,
}

const DESCRIPTION2: TextStyle = {
  fontSize: 18,
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: spacing.large,
}

const SUBMIT_BUTTON: ViewStyle = {
  marginBottom: spacing.normal,
  width: '100%'
}

interface IProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export function RewardPopup({visible, onCancel, onSubmit}: IProps) {
  return (
    <Popup 
    visible={visible}
    onCancel={onCancel}
  >
    <View style={{display: 'flex', alignItems: 'center'}}>
    <Icon style={ICON} icon="reward" />
    <View style={TITLE_CONTAINER}>
      <Text style={TITLE}>คุณได้รับชาเลนจ์ฟรี!</Text>
    </View>
    <Text style={DESCRIPTION}>ยินดีต้อนรับเข้าสู่โลก Wirtual</Text>
    <Text style={DESCRIPTION2}>"Bangkok Wirtual Run"</Text>
    <View style={SUBMIT_BUTTON}>
    <PrimaryButton style={{height: 50}} onPress={onSubmit}><Text style={{color: 'white',fontSize: 15, fontWeight: '500'}}>เข้าร่วมชาเลนจ์</Text></PrimaryButton>
    </View>
    </View>
  </Popup>
  )
}