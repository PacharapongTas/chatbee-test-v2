import { useActionSheet } from '@expo/react-native-action-sheet';
import React, { Fragment, useState } from "react";
import { ActivityIndicator, Alert, Image, Linking, Platform, TouchableOpacity, View } from "react-native";
import RNImagePicker from "react-native-image-picker";
import { ImageModal, Text } from "../../components";
import { uploadImage } from "../../services/api";
import { Icon } from "../icon/icon";
import { DASH_BORDER, IMAGE, LABEL_CONTAINER, LABEL_TEXT, LOADING, PICKER_CONTAINER, PICKER_TEXT, MODAL_IMAGE, IMAGE_PICKER_CONTAINER } from "./styles";


export const BasicImagePicker = ({ labelText, onSelect, pickerText = 'อัพโหลดรูป' }: any) => {
  const [state, setState] = useState({
    imageUrl: null,
    ImageModalVisible: false
  })
  const { showActionSheetWithOptions } = useActionSheet();


  const options = {
    title: labelText,
    cancelButtonTitle: "ยกเลิก",
    takePhotoButtonTitle: "ถ่ายรูปใหม่",
    chooseFromLibraryButtonTitle: "เลือกจากแกลลอรี่",
    storageOptions: {
      skipBackup: true,
      path: "images",
      cameraRoll: true,
    },
  }

  const onPermissionDenied = async () => {
    Alert.alert("Requires Access", "This app requires access to the camera.", [
      { text: "Setting", onPress: () => Linking.openSettings() },
      {
        text: "Cancel",
        style: "cancel",
      },
    ])
  }

  const showImagePicker = async () => {
    RNImagePicker.showImagePicker(options, async response => {
      if (response.error) {
        return onPermissionDenied()
      }

      if (response.uri) {
        setState({ ...state, imageUrl: response.uri })
        onSelect(response)
      }
    })
  }

  const onPressImage = () => {
    if (!state.imageUrl) {
      showImagePicker()
    } else {
      const options = ['ดูรูปภาพ', 'อัพโหลดรูปภาพใหม่', 'ยกเลิก'];
      const cancelButtonIndex = 2;
      showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        buttonIndex => {
          if (buttonIndex === 0) {
            setState({ ...state, ImageModalVisible: true })
          } else if (buttonIndex === 1) {
            showImagePicker()
          }
        },
      )
    }
  }


  return (
    <Fragment>
      {labelText ? (
        <View style={LABEL_CONTAINER}>
          <Text style={LABEL_TEXT}>{labelText}</Text>
        </View>
      ) : null}
      {state.imageUrl ? <ImageModal
        imageSrc={{ uri: state.imageUrl }}
        visible={state.ImageModalVisible}
        onClose={() => setState({ ...state, ImageModalVisible: false })}
        imageStyle={MODAL_IMAGE}
      /> : null}
      <TouchableOpacity
        style={state.imageUrl ? IMAGE_PICKER_CONTAINER : { ...PICKER_CONTAINER, ...DASH_BORDER }}
        onPress={onPressImage}
      >
        {state.imageUrl && <Image source={{ uri: state.imageUrl }} style={IMAGE} />}
        {!state.imageUrl && (
          <Fragment>
            <Icon icon="cloudUpload" />
            <Text style={PICKER_TEXT}>{pickerText}</Text>
          </Fragment>
        )}
      </TouchableOpacity>
    </Fragment>
  )
}
