import React from "react"
import { Modal, TouchableWithoutFeedback, View } from "react-native"
import { BACKGROUND, CONTAINER, OUTLINE_BUTTON, BUTTONS, BUTTON_CONTAINER, TITLE, DESCRIPTION, TITLE_CONTAINER, DESCRIPTION_CONTAINER } from "./styles"
import { Text } from "../text/text"
import { PrimaryButton } from "../button/primary-button"
import { Button } from "../button/button"
import { spacing } from "../../theme"
import { Icon } from "../icon/icon"
import { CLOSE_CONTAINER } from "../size-chart-modal/styles"




export const Dialog = ({ visible, title, description, onCancel, onConfirm }) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={BACKGROUND}>
          <View style={CONTAINER}>
            <View style={TITLE_CONTAINER}>
              <Text style={TITLE}>{title}</Text>
            </View>
            <View style={DESCRIPTION_CONTAINER}>
              <Text style={DESCRIPTION}>{description}</Text>
            </View>
            <View style={BUTTONS}>
              <View style={{ ...BUTTON_CONTAINER, marginRight: spacing.smaller }}>
                <Button style={OUTLINE_BUTTON} onPress={onCancel}><Text>ยกเลิก</Text></Button>
              </View>
              <View style={BUTTON_CONTAINER}>
                <PrimaryButton onPress={onConfirm}><Text>ยืนยัน</Text></PrimaryButton>
              </View>
              <View />
            </View>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={CLOSE_CONTAINER}>
                  <Icon icon="circularClose" />
                </View>
              </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
