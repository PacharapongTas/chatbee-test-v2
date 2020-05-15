import React, { Fragment } from "react"
import { View, Image as RNImage } from "react-native"

import { LABEL_CONTAINER, LABEL_TEXT, IMAGE_CONTAINER, DASH_BORDER, IMAGE, TEXT } from "./styles"
import { Text } from "../text/text"

export const Image = ({ labelText, source }: any) => {
  return (
    <Fragment>
      {labelText && (
        <View style={LABEL_CONTAINER}>
          <Text style={LABEL_TEXT}>{labelText}</Text>
        </View>
      )}
      <View style={source ? IMAGE_CONTAINER : { ...IMAGE_CONTAINER, ...DASH_BORDER }}>
        {source ? <RNImage source={source} style={IMAGE} /> : <Text style={TEXT}>ไม่มีรูปภาพ</Text>}
      </View>
    </Fragment>
  )
}
