import React, { Fragment, useState, useEffect } from "react"
import { View, TouchableOpacity, Image } from "react-native"
import { Svg, Path } from "react-native-svg"
import NumberFormat from "react-number-format"
import Collapsible from "react-native-collapsible"
import moment from "moment"

import { Text } from "../text/text"
import { spacing, color } from "../../theme"
import { Icon } from "../icon/icon"

export const CollapsibleCard = ({ title, items, navigation }: any) => {
  const [state, setState] = useState({
    isCollapsed: true,
    totalDistance: 0,
  })

  useEffect(() => {
    moment().locale("th")

    let totalDistance = 0
    items.forEach(item => {
      totalDistance += item.distance
    })
    setState({ ...state, totalDistance: totalDistance / 1000 })
  }, [])

  const renderCard = ({ key, id, imageSrc, title, subtitle, distance, time, status }) => (
    <TouchableOpacity
      key={key}
      style={{
        width: "100%",
        backgroundColor: color.palette.white,
        borderRadius: 8,
        padding: spacing.normal,
        marginBottom: spacing.small,
      }}
      onPress={() => navigation.navigate("ChallengeFullDetail", { challengeId: id })}
    >
      <View style={{ flexDirection: "row" }}>
        <Image source={imageSrc} style={{ width: 55, height: 55, borderRadius: 10 }} />
        <View
          style={{
            marginLeft: spacing.normal,
            flex: 1,
            height: 55,
            justifyContent: "center",
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 14,
                lineHeight: 24,
                color: color.placeHolderColor,
              }}
            >
              {title}
            </Text>
            <NumberFormat
              value={distance / 1000}
              displayType="text"
              decimalScale={2}
              thousandSeparator
              suffix=" km"
              renderText={text => (
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                    lineHeight: 24,
                    color: color.activeColor,
                  }}
                >
                  {text}
                </Text>
              )}
            />
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 12,
                lineHeight: 19,
                color: color.placeHolderColor,
                opacity: 0.5,
              }}
            >
              {subtitle}
            </Text>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 12,
                lineHeight: 19,
                color: color.placeHolderColor,
                opacity: 0.5,
              }}
            >
              {time} hr
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: "#707070",
          opacity: 0.2,
          borderBottomWidth: 1,
          marginVertical: spacing.small,
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            fontWeight: "500",
            fontSize: 12,
            color: color.placeHolderColor,
            opacity: 0.5,
          }}
        >
          อัพโหลดรูปภาพ
        </Text>
        <View style={{ flexDirection: "row" }}>
          {status === null && (
            <Fragment>
              <Icon icon="statusWait" />
              <Text
                style={{
                  marginLeft: spacing.tiny,
                  fontWeight: "500",
                  fontSize: 12,
                  color: color.warning,
                  opacity: 0.5,
                }}
              >
                รอตรวจสอบ
              </Text>
            </Fragment>
          )}
          {status === true && (
            <Fragment>
              <Icon icon="statusOk" />
              <Text
                style={{
                  marginLeft: spacing.tiny,
                  fontWeight: "500",
                  fontSize: 12,
                  color: color.palette.green,
                  opacity: 0.5,
                }}
              >
                ส่งผลวิ่งสำเร็จ
              </Text>
            </Fragment>
          )}
          {status === false && (
            <Fragment>
              <Icon icon="statusCancel" />
              <Text
                style={{
                  marginLeft: spacing.tiny,
                  fontWeight: "500",
                  fontSize: 12,
                  color: color.activeColor,
                  opacity: 0.5,
                }}
              >
                ส่งผลวิ่งล้มเหลว
              </Text>
            </Fragment>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )

  return (
    <Fragment>
      <TouchableOpacity
        onPress={() => setState({ ...state, isCollapsed: !state.isCollapsed })}
        style={{ padding: spacing.medium }}
      >
        <View
          style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "700", fontSize: 16, lineHeight: 26 }}>
            {title ||
              `${moment(items[0].created_at).format("MMMM")} ${moment(items[0].created_at).get(
                "year",
              ) + 543}`}
          </Text>
          <Svg
            width="15"
            height="15"
            fill="rgba(255,255,255,0.5)"
            viewBox="0 0 448 512"
            style={!state.isCollapsed && { transform: [{ rotate: "180deg" }] }}
          >
            <Path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
          </Svg>
        </View>
        <Text style={{ fontSize: 12, lineHeight: 19, opacity: 0.85 }}>
          จำนวน {items.length} ครั้ง ระยะทางรวม
          <NumberFormat
            value={state.totalDistance}
            displayType="text"
            decimalScale={2}
            thousandSeparator
            suffix=" km"
            renderText={text => (
              <Text style={{ fontSize: 12, lineHeight: 19, opacity: 0.85 }}> {text}</Text>
            )}
          />
        </Text>
      </TouchableOpacity>
      <Collapsible
        collapsed={state.isCollapsed}
        style={{ paddingHorizontal: spacing.medium, paddingBottom: spacing.small }}
      >
        {items.map((item, index) => {
          const createdDate = moment(item.created_at)
          return renderCard({
            key: index,
            id: item.challenge.id,
            imageSrc: item.pictures.length ? { uri: item.pictures[0].image } : null,
            title: `วันที่ ${createdDate.format("DD MMMM")} ${createdDate.get("year") + 543}`,
            subtitle: item.challenge.event.name,
            distance: item.distance,
            time: item.total_time,
            status: item.approved,
          })
        })}
      </Collapsible>
    </Fragment>
  )
}
