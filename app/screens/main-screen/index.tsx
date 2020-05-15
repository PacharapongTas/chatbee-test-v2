import { SearchBox } from "../../components"
import React, { FunctionComponent, useState, useEffect } from "react"
import { View, Image, TouchableOpacity } from "react-native"

import { MainScreenProps, MainCardProps } from "./types"
import { Screen, Header, Text } from "../../components"
import {
  FULL,
  MAIN_CONTAINER,
  MAIN_TITLE,
  MAIN_DESCRIPTION,
  DIVIDER,
  MAIN_CARD_IMAGE,
  MAIN_CARD_CONTAINER,
  MAIN_CARD_CONTENT,
  MAIN_CARD_TITLE,
  MAIN_CARD_SUBTITLE,
} from "./styles"
// import { fetchEvents } from "../../services/api"

export const MainScreen: FunctionComponent<MainScreenProps> = ({ navigation }) => {
  const [state, setState] = useState({
    loading: true,
    searchBoxVisible: false,
  })
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    fetchData(searchText)
  }, [searchText])

  const fetchData = async (name?: string) => {
    // const { results } = await fetchEvents(name)
    setState({ ...state, loading: false })
  }

  const onSearchIconPress = () => {
    setSearchText("")
    setState({ ...state, searchBoxVisible: !state.searchBoxVisible })
  }

  const renderEventCard = ({ imageSrc, title, subtitle, eventId }: MainCardProps) => (
    <TouchableOpacity
      key={eventId}
      style={MAIN_CARD_CONTAINER}
      onPress={() =>
        navigation.navigate("Second", {
          eventTitle: title,
          eventId,
          eventDescription: subtitle,
        })
      }
    >
      <Image source={imageSrc} style={MAIN_CARD_IMAGE} />
      <View style={MAIN_CARD_CONTENT}>
        <Text style={MAIN_CARD_TITLE}>{title}</Text>
        <Text style={MAIN_CARD_SUBTITLE}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={FULL}>
      <Header headerText="Main_Page_1" rightIcon="search" onRightPress={onSearchIconPress} />
      {state.searchBoxVisible && (
        <SearchBox placeholder="ค้นหาชาเลนจ์" onSearch={text => setSearchText(text)} />
      )}
      <Screen preset="scroll" loading={state.loading} onRefresh={() => fetchData()}>
        <View style={MAIN_CONTAINER}>
          <Text style={MAIN_TITLE}>เลือก Card Main เพื่อไปหน้าต่อไป</Text>
          <Text style={MAIN_DESCRIPTION}>
            ChatBee.co เดโม่ ALL Might Description
          </Text>
        </View>
        <View style={DIVIDER} />
        {
          renderEventCard({
            imageSrc: { uri: "" },
            title: "Title_Second",
            subtitle: "Subtitle_Second",
            eventId: "1",
          })
        }
        <View style={DIVIDER} />
      </Screen>
    </View>
  )
}
