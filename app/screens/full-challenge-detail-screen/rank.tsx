import React, { Fragment } from "react"
import { View } from "react-native"

import { RankCard } from "../leaderboard-screen/rank-card"
import { getLeaderboard, getLeaderboardMyRank, getLeaderboardFriendRank } from "../../services/api"
import { CHALLENGE_TYPES } from "../../utils/constants"
import { SwitchSelector } from "../../components"

export class Rank extends React.Component<any> {
  state = {
    switchIndex: "all",
    allRankList: [],
    friendRankList: [],
    myRank: [],
  }

  async componentDidMount() {
    const { challenge } = this.props
    const { results: allRankList } = await getLeaderboard({ challenge_id: challenge.id })
    const { results: friendRankList } = await getLeaderboardFriendRank({
      challenge_id: challenge.id,
    })
    const { results: myRank } = await getLeaderboardMyRank({ challenge_id: challenge.id })
    this.setState({ allRankList, friendRankList, myRank })
  }

  render() {
    const { switchIndex, allRankList, friendRankList, myRank } = this.state
    const { challenge } = this.props
    return (
      <Fragment>
        <View style={{ alignSelf: "center" }}>
          <SwitchSelector
            options={[{ label: "ทั้งหมด", value: "all" }, { label: "เพื่อน", value: "friends" }]}
            initial={0}
            onPress={switchIndex => this.setState({ switchIndex })}
          />
        </View>
        {(switchIndex === "all" ? allRankList : friendRankList).map((item, index) => (
          <RankCard {...item} key={index} event_name={CHALLENGE_TYPES[challenge.type.toString()]} />
        ))}
        {myRank.map((item, index) => (
          <RankCard
            {...item}
            key={index}
            event_name={CHALLENGE_TYPES[challenge.type.toString()]}
            border
          />
        ))}
      </Fragment>
    )
  }
}
