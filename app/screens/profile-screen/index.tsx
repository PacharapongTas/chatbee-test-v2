import React, { useState, useEffect, Fragment } from "react"
import { View, ViewStyle, Image, TouchableOpacity, ImageStyle, TextStyle } from "react-native"
import { Svg, Defs, LinearGradient, Stop, Path } from "react-native-svg"
import NumberFormat from "react-number-format"

import { Text, Screen, Icon, CollapsibleCard } from "../../components"
import { color, spacing } from "../../theme"
import { getStatistic, fetchSubmitData, getMe } from "../../services/api"

const defaultImage = require("../../assets/logos/wirtual-square-logo.png")

const FULL: ViewStyle = {
  flex: 1,
}

const SCREEN: ViewStyle = {
  paddingBottom: spacing.medium,
}

const CURVE_CONTAINER: ViewStyle = {
  width: "100%",
  height: 240,
  justifyContent: "flex-end",
  alignItems: "center",
}

const CURVE: ViewStyle = {
  position: "absolute",
}

const CURVE_CONTENT: ViewStyle = {
  height: "100%",
  alignItems: "center",
}

const PROFILE_IMAGE: ImageStyle = {
  width: 90,
  height: 90,
  borderRadius: 45,
  marginTop: spacing.medium,
  backgroundColor: color.darkBackground,
}

const PROFILE_NAME: TextStyle = {
  marginTop: spacing.smaller,
  textAlign: 'center',
  fontWeight: "700",
  fontSize: 24,
  lineHeight: 37,
}

const PROFILE_EDIT: TextStyle = {
  fontSize: 12,
  lineHeight: 19,
  textDecorationLine: "underline",
  opacity: 0.85,
}

const CENTER: ViewStyle = {
  alignItems: "center",
}

const DISTANCE_LABEL: TextStyle = {
  fontWeight: "700",
  fontSize: 16,
  lineHeight: 26,
}

const DISTANCE_VALUE: TextStyle = {
  fontWeight: "700",
  fontSize: 32,
  color: color.palette.vividPink2,
}

const DISTANCE_UNIT: TextStyle = {
  fontWeight: "300",
  fontSize: 14,
  lineHeight: 26,
  opacity: 0.5,
}

const DETAIL_CONTAINER: ViewStyle = {
  marginTop: spacing.normal,
  width: "100%",
  flexDirection: "row",
  paddingHorizontal: spacing.normal,
}

const DETAIL_ITEM: ViewStyle = {
  flex: 1,
  alignItems: "center",
}

const DETAIL_LABEL: TextStyle = {
  marginTop: spacing.normal,
  fontWeight: "300",
  fontSize: 12,
}

const DETAIL_VALUE: TextStyle = {
  fontWeight: "700",
  fontSize: 16,
  lineHeight: 30,
}

const DETAIL_UNIT: TextStyle = {
  fontWeight: "300",
  fontSize: 10,
  lineHeight: 18,
  opacity: 0.5,
  marginBottom: spacing.large,
}

const DETAIL_ICON: ImageStyle = {
  marginTop: 8,
}

const HORIZONTAL_DIVIDER: ViewStyle = {
  width: "100%",
  height: 1,
  borderBottomColor: color.line,
  borderBottomWidth: 1,
  opacity: 0.2,
}

export const ProfileScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true)
  const [userData, setUserData] = useState({
    profileImage: null,
    firstName: "",
    lastName: "",
  })
  const [statistic, setStatistic] = useState({
    totalDistance: 0,
    totalChallenge: 0,
    avgTime: "0’00’00",
    totalTime: "00:00:00",
  })
  const [submitData, setSubmitData] = useState([])

  useEffect(() => {
    fetchData().then(() => setLoading(false))
  }, [])

  const fetchData = async () => {
    const userData = await getMe()
    setUserData({
      profileImage: userData.user_profile.profile_picture,
      firstName: userData.first_name,
      lastName: userData.last_name,
    })

    const statistic = await getStatistic()
    setStatistic({
      totalDistance: statistic.total_distance,
      totalChallenge: statistic.number_of_challenges,
      avgTime: statistic.average_time,
      totalTime: statistic.total_time,
    })

    const submitData = await fetchSubmitData()
    let SubmitDataByMonth = {}
    submitData.forEach(item => {
      SubmitDataByMonth = groupItemByCreatedDate(SubmitDataByMonth, item)
    })
    const groupedSubmitData = []
    Object.keys(SubmitDataByMonth).forEach(year => {
      Object.keys(SubmitDataByMonth[year]).forEach(month => {
        groupedSubmitData.push(SubmitDataByMonth[year][month])
      })
    })
    setSubmitData(groupedSubmitData)
  }

  const groupItemByCreatedDate = (accumulator, item) => {
    const createdDate = new Date(item.created_at)
    const createdMonth = createdDate.getMonth().toString()
    const createdYear = createdDate.getFullYear().toString()
    if (accumulator[createdYear]) {
      if (accumulator[createdYear][createdMonth]) {
        accumulator[createdYear][createdMonth].push(item)
      } else {
        accumulator[createdYear] = {
          ...accumulator[createdYear],
          [createdMonth]: [item],
        }
      }
    } else {
      accumulator = { ...accumulator, [createdYear]: { [createdMonth]: [item] } }
    }
    return accumulator
  }

  const goToEditProfileScreen = () =>
    navigation.navigate("EditProfile", { refreshParentState: fetchData })

  return (
    <View style={FULL}>
      <Screen
        preset="scroll"
        backgroundColor={color.darkBackground2}
        loading={loading}
        style={SCREEN}
        onRefresh={() =>fetchData()}
      >
        <View style={CURVE_CONTAINER}>
          <Svg width="200%" height="150%" viewBox="0 0 673.914 296" style={CURVE}>
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={color.palette.purple} />
                <Stop offset="100%" stopColor={color.palette.lipstick} />
              </LinearGradient>
            </Defs>
            <Path
              d="M327.957,0C509.082,0,655.914,62.232,655.914,139S509.082,278,327.957,278,0,215.768,0,139,146.831,0,327.957,0Z"
              fill="url(#grad)"
            />
          </Svg>
          <View style={CURVE_CONTENT}>
            <Image
              source={userData.profileImage ? { uri: userData.profileImage.image } : defaultImage}
              style={PROFILE_IMAGE}
            />
            <Text style={PROFILE_NAME}>
              {userData.firstName} {userData.lastName}
            </Text>
            <TouchableOpacity onPress={goToEditProfileScreen}>
              <Text style={PROFILE_EDIT}>แก้ไขโปรไฟล์</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={CENTER}>
          <Text style={DISTANCE_LABEL}>ระยะทางทั้งหมด</Text>
          <NumberFormat
            value={statistic.totalDistance / 1000}
            displayType="text"
            decimalScale={2}
            thousandSeparator
            renderText={text => <Text style={DISTANCE_VALUE}>{text}</Text>}
          />
          <Text style={DISTANCE_UNIT}>กิโลเมตร</Text>
        </View>
        <View style={DETAIL_CONTAINER}>
          <View style={DETAIL_ITEM}>
            <Icon icon="circularChallenge" />
            <Text style={DETAIL_LABEL}>จำนวนชาเลนจ์</Text>
            <Text style={DETAIL_VALUE}>{statistic.totalChallenge}</Text>
            <Text style={DETAIL_UNIT}>ชาเลนจ์</Text>
          </View>
          <View style={DETAIL_ITEM}>
            <Icon icon="circularDial" style={DETAIL_ICON} />
            <Text style={DETAIL_LABEL}>เวลาเฉลี่ย</Text>
            <Text style={DETAIL_VALUE}>{statistic.avgTime}</Text>
            <Text style={DETAIL_UNIT}>นาที / กิโลเมตร</Text>
          </View>
          <View style={DETAIL_ITEM}>
            <Icon icon="circularTime" />
            <Text style={DETAIL_LABEL}>ระยะเวลาทั้งหมด</Text>
            <Text style={DETAIL_VALUE}>{statistic.totalTime}</Text>
            <Text style={DETAIL_UNIT}>ชั่วโมง</Text>
          </View>
        </View>
        <View style={HORIZONTAL_DIVIDER} />
        {submitData.map((items, index) => (
          <Fragment key={index}>
            <CollapsibleCard items={items} navigation={navigation} />
            <View style={HORIZONTAL_DIVIDER} />
          </Fragment>
        ))}
      </Screen>
    </View>
  )
}
