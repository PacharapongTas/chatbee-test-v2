import { ImageSourcePropType, ImageStyle } from "react-native"
import React from "react"
import { Modal, View, TouchableWithoutFeedback, Image } from "react-native"

import { BACKGROUND, CONTAINER, IMAGE } from "./styles"

interface IProps {
  imageSrc: ImageSourcePropType;
  visible: boolean;
  onClose: () => void;
  imageStyle?: ImageStyle;
}

export const ImageModal = ({ imageSrc, visible, onClose, imageStyle }: IProps) => {
  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={BACKGROUND}>
          <View style={CONTAINER}>
            <Image source={imageSrc} style={imageStyle ? imageStyle : IMAGE} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
