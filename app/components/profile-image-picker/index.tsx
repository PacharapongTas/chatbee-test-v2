import React, { Fragment, useState } from "react"
import { TouchableOpacity, Image, ActivityIndicator, View, Platform } from "react-native"
import RNImagePicker from "react-native-image-picker"

import { Icon } from "../icon/icon"
import { IMAGE_CONTAINER, IMAGE, ICON, LOADING } from "./styles"
import { uploadImage } from "../../services/api"

const defaultImage = require("../../assets/logos/wirtual-square-logo.png")

export const ProfileImagePicker = ({ source, onSelect, onUpload }: any) => {
  const [state, setState] = useState({
    uploading: false,
    imageSrc: source,
  })

  const options = {
    title: "เลือกรูปโปรไฟล์",
    cancelButtonTitle: "ยกเลิก",
    takePhotoButtonTitle: "ถ่ายรูปใหม่",
    chooseFromLibraryButtonTitle: "เลือกจากแกลลอรี่",
    storageOptions: {
      skipBackup: true,
      path: "Wirtual",
    },
  }

  const showImagePicker = async () => {
    if (onUpload) {
      onUpload({ uploading: true })
    }
    await setState({ ...state, uploading: true })
    RNImagePicker.showImagePicker(options, async response => {
      if (response.uri) {
        const formData = new FormData()

        formData.append("image", {
          ...response,
          name: "image.jpg",
          uri: Platform.OS === "android" ? response.uri : response.uri.replace("file://", ""),
        })
        uploadImage(formData).then(data => {
          setState({ ...state, uploading: false, imageSrc: { uri: data.image } })
          if (onSelect) {
            onSelect(data)
          }
          if (onUpload) {
            onUpload({ uploading: false })
          }
        })
      } else {
        await setState({ ...state, uploading: false })
        if (onUpload) {
          onUpload({ uploading: false })
        }
      }
    })
  }

  return (
    <Fragment>
      <TouchableOpacity style={IMAGE_CONTAINER} onPress={showImagePicker}>
        {state.uploading && (
          <View style={LOADING}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
        <Image source={state.imageSrc || defaultImage} style={IMAGE} />
        <Icon icon="circularEdit" style={ICON} />
      </TouchableOpacity>
    </Fragment>
  )
}
