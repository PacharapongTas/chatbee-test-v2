import React, { useState } from "react";
import { ViewStyle, TouchableOpacity } from 'react-native';
import AutoHeightImage from 'react-native-auto-height-image';
import { spacing } from '../../theme';

const FEED = (index): ViewStyle => ({
  marginTop: index ? 0 : spacing.medium,
  marginBottom: spacing.medium,
})

export function FeedCard({navigation, width, url, index, imageSrc}) {
  
  return     <TouchableOpacity
  onPress={() => {
  navigation.navigate("WebView", {
      title: "ข่าวสาร",
      uri: url,
    })
  }}
  style={FEED(index)}
>
   <AutoHeightImage
      width={width}
      source={imageSrc}
      animated={true}
    />
</TouchableOpacity>
}