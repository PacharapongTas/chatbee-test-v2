import React, { Fragment } from "react"
import { View, ViewStyle } from "react-native"
import RNPickerSelect, { PickerProps } from "react-native-picker-select"
import { Svg, Path } from "react-native-svg"

import {
  LABEL_CONTAINER,
  LABEL_TEXT,
  PICKER_CONTAINER,
  PICKER_VIEW_ANDROID,
  PCIKER_PLACEHOLDER,
  PICKER_VIEW_IOS,
} from "./styles"
import { Text } from "../text/text"
import { color } from "../../theme"

interface Props extends PickerProps {
  name?: string
  labelText: string
  pickerContainerStyle?: ViewStyle
  error?: boolean
}

export const Picker = ({ labelText, pickerContainerStyle, error, ...props }: Props) => {
  return (
    <Fragment>
      {labelText && (
        <View style={LABEL_CONTAINER}>
          <Text style={LABEL_TEXT}>{labelText}</Text>
        </View>
      )}
      <View style={{ ...PICKER_CONTAINER({ error }), ...pickerContainerStyle }}>
        <RNPickerSelect
          {...props}
          Icon={() => (
            <View
              style={{
                width: 11,
                height: 11,
                top: 17,
                right: 17,
              }}
            >
              <Svg width="11" height="11" fill={color.darkBackground} viewBox="0 0 448 512">
                <Path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
              </Svg>
            </View>
          )}
          useNativeAndroidPickerStyle={false}
          style={{
            inputAndroid: PICKER_VIEW_ANDROID,
            placeholder: PCIKER_PLACEHOLDER,
            inputIOS: PICKER_VIEW_IOS,
          }}
        />
      </View>
    </Fragment>
  )
}
