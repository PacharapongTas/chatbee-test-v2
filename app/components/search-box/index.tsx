import React, { useState } from "react"
import { View, TextInput, TouchableOpacity } from "react-native"

import { INPUT_CONTAINER, INPUT, INPUT_TEXT, ICON_CONTAINER, ICON } from "./styles"
import { Icon } from "../icon/icon"

export const SearchBox = ({ placeholder, onSearch, ...props }) => {
  const [text, setText] = useState("")

  return (
    <View style={INPUT_CONTAINER}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#a3a3b6" // 45% #32325D + 55% #FFFFFF
        onChangeText={text => setText(text)}
        style={{ ...INPUT, ...INPUT_TEXT }}
        blurOnSubmit={true}
        returnKeyType="search"
        onSubmitEditing={() => onSearch(text)}
        {...props}
      />
      <TouchableOpacity onPress={() => onSearch(text)} style={ICON_CONTAINER}>
        <Icon icon="search" style={ICON} />
      </TouchableOpacity>
    </View>
  )
}
