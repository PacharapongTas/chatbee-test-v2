import React, { Fragment, useEffect, useState } from "react"
import { View } from "react-native"
import moment from "moment"
import "moment/locale/th"

import { Image, Text, TextInput } from "../../components"
import { DATE_CONTAINER, DATE_LABEL, DATE_TEXT, DATE_SPACER, CONFIRM_BUTTON } from "./styles"
import { PrimaryButton } from "../../components/button/primary-button"
import { submitChallengeData } from "../../services/api"
import { useNotificationBarContext } from "../../GlobalContext"
import { ActivityIndicatorWithContainer } from "../../components/activity-indicator-with-container"

const ConfirmScreen = ({ navigation }) => {
  const [_, setNotficationBar] = useNotificationBarContext()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    moment().locale("th")
  }, [])

  const handleSubmit = async () => {
       const { challengeId, picture_ids, distance, time } = navigation.state.params

    // convert time to seconds
    const formattedTime = moment(time, "HH:mm:ss").diff(
      moment().startOf("day"),
      "seconds",
    )

    // convert km to metre
    const distanceInMetre = distance * 1000

    setLoading(true)
    try {
      await submitChallengeData(challengeId, { picture_ids, distance: distanceInMetre, time: formattedTime })
      .then((data) => {
        navigation.replace("SendResult", {challengeId: navigation.state.params.challengeId})
      })
    } catch (error) {
      setNotficationBar(error.detail, 'warning', true)
    } finally {
      setLoading(false)
    }
  }

  const created_at = navigation.state.params.created_at
    ? moment(navigation.state.params.created_at, "YYYY-MM-DDTHH:mm:ssZ")
    : moment()

  return (
    <Fragment>
      <Image
        labelText="รูปภาพที่อัพโหลด"
        source={
          navigation.state.params.previewImageUrl
            ? { uri: navigation.state.params.previewImageUrl }
            : null
        }
      />
      <View style={DATE_CONTAINER}>
        <Text style={DATE_LABEL}>วันที่</Text>
        <Text style={DATE_TEXT}>
          {created_at.format("D MMMM")} {created_at.get("year") + 543}
        </Text>
        <View style={DATE_SPACER} />
        <Text style={DATE_LABEL}>เวลา</Text>
        <Text style={DATE_TEXT}>{created_at.format("HH:mm")} น.</Text>
      </View>
      <TextInput
        // @ts-ignore
        editable={false}
        labelText="รายการวิ่ง"
        value={navigation.state.params.previewTitle}
      />
      <TextInput
        // @ts-ignore
        editable={false}
        labelText="ระยะทาง"
        value={navigation.state.params.distance}
        suffixText="Km"
      />
      <TextInput
        // @ts-ignore
        editable={false}
        labelText="เวลา"
        value={navigation.state.params.time}
        suffixText="hr"
      />
      <PrimaryButton onPress={handleSubmit} disabled={loading} containerStyle={CONFIRM_BUTTON}>
        {loading ? <ActivityIndicatorWithContainer /> : <Text>ยืนยันการส่งผลวิ่ง</Text>}
      </PrimaryButton>
    </Fragment>
  )
}

export default ConfirmScreen
