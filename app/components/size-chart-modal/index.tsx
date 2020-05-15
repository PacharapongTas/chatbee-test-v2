import React from "react"
import { Modal, View, TouchableWithoutFeedback, Image } from "react-native"

import { BACKGROUND, CONTAINER, CLOSE_CONTAINER } from "./styles"
import { Icon } from "../icon/icon"

const sizeChart = require("../../assets/images/shirt-size-chart.png")

export const SizeChartModal = ({ visible, onClose }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={BACKGROUND}>
          <TouchableWithoutFeedback>
            <View style={CONTAINER}>
              <TouchableWithoutFeedback onPress={onClose}>
                <View style={CLOSE_CONTAINER}>
                  <Icon icon="circularClose" />
                </View>
              </TouchableWithoutFeedback>
              <Image source={sizeChart} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
