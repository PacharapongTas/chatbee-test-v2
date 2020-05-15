import React, { Component } from "react"
import { View, FlatList } from "react-native"

import { FULL, CONTAINER, TEXT_HEADER } from "./styles"
import { Screen, Text, SwitchSelector } from "../../components"
import { RankCard } from "./rank-card"
import { getLeaderboard, getLeaderboardFriendRank, getLeaderboardMyRank } from "../../services/api"
import { spacing, color } from "../../theme"

const options = [{ label: "ทั้งหมด", value: "all" }, { label: "เพื่อน", value: "friends" }]

const PAGE_SIZE = 5

export class LeaderBoardRankScreen extends Component<any> {
  constructor(props) {
    super(props)
    this.state = {
      switchIndex: "all",
      myRankResults: [],
      allRankResults: [],
      friendRankResults: [],
      loading: true,
      allLoadMore: {
        pageNumber: 1,
        hasNext: false,
      },
      friendLoadMore: {
        pageNumber: 1,
        hasNext: false,
      },
    }
  }

  async componentDidMount() {
    // @ts-ignore
    const { allLoadMore, friendLoadMore } = this.state
    const { type } = this.props
    const myRank = await getLeaderboardMyRank({ challenge_type: type })
    const allRank = await getLeaderboard({
      challenge_type: type,
      page: allLoadMore.pageNumber,
      page_size: PAGE_SIZE,
    })
    const friendRank = await getLeaderboardFriendRank({
      challenge_type: type,
      page: friendLoadMore.pageNumber,
      page_size: PAGE_SIZE,
    })
    await this.setState({
      myRankResults: myRank.results[0],
      allRankResults: allRank.results,
      friendRankResults: friendRank.results,
      loading: false,
      allLoadMore: { ...allLoadMore, hasNext: !!allRank.links.next },
      friendLoadMore: { ...friendLoadMore, hasNext: !!friendRank.links.next },
    })
  }

  allLoadMore = async () => {
    // @ts-ignore
    const { allRankResults, allLoadMore } = this.state
    const { type } = this.props
    if (allLoadMore.hasNext) {
      const pageNumber = allLoadMore.pageNumber + 1
      const { links, results: allRank } = await getLeaderboard({
        challenge_type: type,
        page: pageNumber,
        page_size: PAGE_SIZE,
      })
      this.setState({
        allLoadMore: { hasNext: !!links.next, pageNumber },
        allRankResults: [...allRankResults, ...allRank],
      })
    }
  }

  friendLoadMore = async () => {
    // @ts-ignore
    const { friendRankResults, friendLoadMore } = this.state
    const { type } = this.props
    if (friendLoadMore.hasNext) {
      const pageNumber = friendLoadMore.pageNumber + 1
      const { links, results: friendRank } = await getLeaderboardFriendRank({
        challenge_type: type,
        page: pageNumber,
        page_size: PAGE_SIZE,
      })
      this.setState({
        friendLoadMore: { hasNext: !!links.next, pageNumber },
        friendRankResults: [...friendRankResults, ...friendRank],
      })
    }
  }

  render() {
    const {
      switchIndex,
      myRankResults,
      allRankResults,
      friendRankResults,
      loading,
    }: any = this.state
    const { event_name } = this.props
    return (
      <View style={FULL}>
        <Screen style={CONTAINER} backgroundColor={color.darkBackground2} loading={loading}>
          <Text style={TEXT_HEADER}>อันดับของคุณ</Text>
          <RankCard {...myRankResults} event_name={event_name} />
          <View style={{ alignSelf: "center", marginTop: spacing.small }}>
            <SwitchSelector
              options={options}
              initial={0}
              onPress={switchIndex => this.setState({ switchIndex })}
            />
          </View>
          <FlatList
            data={switchIndex === "all" ? allRankResults : friendRankResults}
            // @ts-ignore
            renderItem={({ item }) => <RankCard {...item} event_name={event_name} />}
            keyExtractor={(item, index) => index.toString()}
            onEndReachedThreshold={0.4}
            onEndReached={() =>
              switchIndex === "all" ? this.allLoadMore() : this.friendLoadMore()
            }
          />
        </Screen>
      </View>
    )
  }
}
