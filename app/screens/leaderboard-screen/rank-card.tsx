import React from "react"
import { View, Image } from "react-native"
import {
  RANK_CARD,
  TEXT_TITLE,
  TEXT_SUB_TITLE,
  RANK_NUMBER_COLUMN,
  TEXT_NUMBER,
  NAME_COLUMN,
  DISTANCE_COLUMN,
  NUMBER_ICON,
} from "./styles"
import numeral from "numeral"

import { Text, Icon } from "../../components"
import { IRankCardProps } from "./rank-card.props"
import { color, spacing } from "../../theme"

const defaultImage = require("../../assets/logos/wirtual-square-logo.png")

// @ts-ignore
function getRankIcon(rank: number) {
  switch (rank) {
    case 1:
      return "numberOne"

    case 2:
      return "numberTwo"

    case 3:
      return "numberThree"
  }
}

export function RankCard(props: IRankCardProps) {
  const { row_number, user, event_name, total_distance, total_time, border } = props

  const profileImage = (user && user.user_profile) || ""

  const activeBorder = border ? { borderColor: color.activeColor } : {}

  return (
    <View style={{ ...RANK_CARD, ...activeBorder }}>
      <View style={RANK_NUMBER_COLUMN}>
        {row_number ? <Text style={TEXT_NUMBER}>{row_number}</Text>  : null}
      </View>
      <View style={{ marginHorizontal: spacing.smaller }}>
        <Image
          source={
            profileImage && profileImage.profile_picture
              ? {
                  uri: profileImage.profile_picture.image,
                }
              : defaultImage
          }
          style={{ width: 42, height: 42, borderRadius: 21 }}
        />
        {row_number <= 3 ? (
          <Icon
            icon={getRankIcon(row_number)}
            style={NUMBER_ICON}
            containerStyle={{ position: "absolute", bottom: -3 }}
          />
        ) : null}
      </View>
      <View style={NAME_COLUMN}>
        <Text style={TEXT_TITLE}>{user ? `${user.first_name} ${user.last_name}` : ""}</Text>
        <Text style={TEXT_SUB_TITLE}>{event_name}</Text>
      </View>
      <View style={DISTANCE_COLUMN}>
        <Text style={TEXT_TITLE}>{numeral(total_distance / 1000).format("0.0[0]")} km</Text>
        <Text style={TEXT_SUB_TITLE}>{total_time || 0} hr</Text>
      </View>
    </View>
  )
}
