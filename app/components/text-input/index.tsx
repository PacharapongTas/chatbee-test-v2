import React, { Component, Fragment } from "react"
import { View, TextInput as RNTextInput } from "react-native"

import {
  LABEL_CONTAINER,
  LABEL_TEXT,
  INPUT_CONTAINER,
  INPUT,
  INPUT_TEXT,
  SUFFIX_CONTAINER,
} from "./styles"
import { Text } from "../text/text"

export class TextInput extends Component {
  render() {
    const { labelText, placeholder, suffixText, style, error, ...props }: any = this.props
    const disabled = typeof props.editable === "boolean" && !props.editable
    return (
      <Fragment>
        {labelText && (
          <View style={LABEL_CONTAINER}>
            <Text style={LABEL_TEXT}>{labelText}</Text>
          </View>
        )}
        <View style={INPUT_CONTAINER}>
          <RNTextInput
            placeholder={placeholder}
            placeholderTextColor="#a3a3b6" // 45% #32325D + 55% #FFFFFF
            style={{
              ...INPUT({ disabled, error }),
              ...INPUT_TEXT({ disabled }),
              ...style,
            }}
            {...props}
          />
          <View style={{ ...SUFFIX_CONTAINER({ disabled, error }), ...style }}>
            <Text style={INPUT_TEXT({ disabled })}>{suffixText}</Text>
          </View>
        </View>
      </Fragment>
    )
  }
}
