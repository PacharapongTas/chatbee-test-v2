import React, { useEffect, useState, Fragment } from "react"
import {
  View,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
  TouchableOpacity,
  FlatList,
} from "react-native"

import { Screen, Text, SearchBox, Icon } from "../../components"
import { spacing, color } from "../../theme"
import { fetchFriends, followFriend, unfollowFriend } from "../../services/api"
import { Dialog } from "../../components/dialog"
import { useNotificationBarContext } from "../../GlobalContext"

const defaultImage = require("../../assets/logos/wirtual-square-logo.png")

const FULL: ViewStyle = {
  flex: 1,
}

const TEXT_CONTAINER: ViewStyle = {
  flexDirection: "row",
}

const TEXT: TextStyle = {
  fontWeight: "700",
  fontSize: 14,
}

const ACTIVE_TEXT: TextStyle = {
  ...TEXT,
  color: color.activeColor,
  marginHorizontal: spacing.tiny,
}

const SEARCH_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.normal,
}

const DIVIDER: ViewStyle = {
  width: "100%",
  height: 1,
  borderBottomColor: color.line,
  borderBottomWidth: 1,
  opacity: 0.2,
}

const CARD_COTAINER: ViewStyle = {
  paddingHorizontal: spacing.medium,
  paddingVertical: spacing.small,
  flexDirection: "row",
  alignItems: "center",
}

const CARD_IMAGE: ImageStyle = {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: spacing.small,
}

const CARD_ICON: ImageStyle = {
  padding: 5,
}

export const FriendsScreen = ({ navigation }) => {
  // @ts-ignore
  const [_, setNotificationBar] = useNotificationBarContext()
  const [state, setState] = useState({
    loading: false,
    searchText: "",
    pageSize: 10,
    pageNumber: 1,
    hasNext: false,
    unFollowDialogVisible: false,
    unfollowObject: {
      index: 0,
      userId: 0,
    },
  })
  const [friends, setFriends] = useState([])

  const loadMore = async () => {
    if (state.hasNext) {
      const pageNumber = state.pageNumber + 1
      const { links, results } = await fetchFriends({
        name: state.searchText,
        page: pageNumber,
        page_size: state.pageSize,
      })
      setState({ ...state, pageNumber, hasNext: !!links.next })
      setFriends([...friends, ...results])
    }
  }

  const handleSearch = async text => {
    const { links, results } = await fetchFriends({
      name: text,
      page: 1,
      page_size: state.pageSize,
    })
    setFriends(results)
    setState({
      ...state,
      searchText: text,
      pageNumber: 1,
      hasNext: !!links.next,
    })
  }

  const handleFollowFriend = async (index, userId) => {
    await followFriend(userId)
    const newFriends = [...friends]
    newFriends[index].followed = true
    setFriends(newFriends)

    setNotificationBar("ยินดีด้วย! คุณติดตามเพื่อนสำเร็จแล้ว", "success", true)
  }

  const handleUnfollowFriend = async (index, userId) => {
    await unfollowFriend(userId)
    const newFriends = [...friends]
    newFriends[index].followed = false
    setFriends(newFriends)

    setState({
      ...state,
      unfollowObject: {
        index: 0,
        userId: 0,
      },
      unFollowDialogVisible: false,
    })

    setNotificationBar("คุณยกเลิกการติดตามสำเร็จแล้ว", "success", true)
  }

  const onPressUnFollow = async (index, userId) => {
    setState({
      ...state,
      unfollowObject: {
        index,
        userId,
      },
      unFollowDialogVisible: true,
    })
  }

  const initialFriendList = async () => {
    const { links, results } = await fetchFriends({
      name: state.searchText,
      page: state.pageNumber,
      page_size: state.pageSize,
    })
    setState({ ...state, hasNext: !!links.next })
    setFriends(results)
  }

  useEffect(() => {
    initialFriendList()
  }, [])

  const renderCard = ({ key, id, imageSrc, firstName, lastName, isFollowed }: any) => (
    <View key={key} style={CARD_COTAINER}>
      <Image source={imageSrc || defaultImage} style={CARD_IMAGE} />
      <Text style={{ ...TEXT, flex: 1 }}>
        {firstName} {lastName}
      </Text>
      <TouchableOpacity
        style={CARD_ICON}
        onPress={() => (isFollowed ? onPressUnFollow(key, id) : handleFollowFriend(key, id))}
      >
        <Icon icon={isFollowed ? "redClose" : "circularPlus"} />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={FULL}>
      <Dialog
        visible={state.unFollowDialogVisible}
        title="ยกเลิกการติดตามใช่ไหม"
        description="คุณแน่ใจหรือไม่ที่จะยกเลิกการติดตาม เมื่อคุณยกเลิกการติดตาม คุณจะไม่สามารถเห็นการเคลื่อนไหวของเพื่อนคุณอีกต่อไป"
        onCancel={() => setState({ ...state, unFollowDialogVisible: false })}
        onConfirm={() =>
          handleUnfollowFriend(state.unfollowObject.index, state.unfollowObject.userId)
        }
      />
      <Screen loading={state.loading} backgroundColor={color.darkBackground2}>
        <View style={SEARCH_CONTAINER}>
          <View style={TEXT_CONTAINER}>
            <Text style={TEXT}>เพื่อนทั้งหมดของคุณ</Text>
            <Text style={ACTIVE_TEXT}>{friends.length}</Text>
            <Text style={TEXT}>คน</Text>
          </View>
          <SearchBox placeholder="ค้นหาเพื่อน" onSearch={handleSearch} />
        </View>
        <View style={DIVIDER} />
        <FlatList
          data={friends}
          // @ts-ignore
          renderItem={({ item, index }) => (
            <Fragment>
              {renderCard({
                key: index,
                id: item.id,
                imageSrc:
                  item.user_profile && item.user_profile.profile_picture
                    ? { uri: item.user_profile.profile_picture.image }
                    : null,
                firstName: item.first_name,
                lastName: item.last_name,
                isFollowed: item.followed,
              })}
            </Fragment>
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={0.4}
          onEndReached={() => loadMore()}
        />
        <View style={DIVIDER} />
      </Screen>
    </View>
  )
}
