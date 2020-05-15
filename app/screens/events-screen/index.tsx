import { SearchBox } from "../../components"
import React, { FunctionComponent, useState, useEffect } from "react"
import { View, Image, TouchableOpacity } from "react-native"

import { EventsScreenProps, EventCardProps } from "./types"
import { Screen, Header, Text } from "../../components"
import {
  FULL,
  EVENT_CONTAINER,
  EVENT_TITLE,
  EVENT_DESCRIPTION,
  DIVIDER,
  EVENT_CARD_IMAGE,
  EVENT_CARD_CONTAINER,
  EVENT_CARD_CONTENT,
  EVENT_CARD_TITLE,
  EVENT_CARD_SUBTITLE,
} from "./styles"
import { fetchEvents } from "../../services/api"

export const EventsScreen: FunctionComponent<EventsScreenProps> = ({ navigation }) => {
  const [state, setState] = useState({
    loading: true,
    events: [],
    searchBoxVisible: false,
  })
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    fetchData(searchText)
  }, [searchText])

  const fetchData = async (name?: string) => {
    const { results } = await fetchEvents(name)
    setState({ ...state, loading: false, events: results })
  }

  const onSearchIconPress = () => {
    setSearchText("")
    setState({ ...state, searchBoxVisible: !state.searchBoxVisible })
  }

  const renderEventCard = ({ imageSrc, title, subtitle, eventId }: EventCardProps) => (
    <TouchableOpacity
      key={eventId}
      style={EVENT_CARD_CONTAINER}
      onPress={() =>
        navigation.navigate("Challenges", {
          eventTitle: title,
          eventId,
          eventDescription: subtitle,
        })
      }
    >
      <Image source={imageSrc} style={EVENT_CARD_IMAGE} />
      <View style={EVENT_CARD_CONTENT}>
        <Text style={EVENT_CARD_TITLE}>{title}</Text>
        <Text style={EVENT_CARD_SUBTITLE}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={FULL}>
      <Header headerText="ชาเลนจ์" rightIcon="search" onRightPress={onSearchIconPress} />
      {state.searchBoxVisible && (
        <SearchBox placeholder="ค้นหาชาเลนจ์" onSearch={text => setSearchText(text)} />
      )}
      <Screen preset="scroll" loading={state.loading} onRefresh={() => fetchData()}>
        <View style={EVENT_CONTAINER}>
          <Text style={EVENT_TITLE}>เลือกชาเลนจ์ของคุณ</Text>
          <Text style={EVENT_DESCRIPTION}>
            Wirtual.co เราคือแพลตฟอร์ม Virtual run รูปแบบใหม่
            ที่จะทําให้การวิ่งท้าทายและสนุกมากยิ่งขึ้น
            ร่วมพิชิตชาเลนจ์ด้วยเส้นทางเสมือนจริงก่อนใครที่นี่
          </Text>
        </View>
        <View style={DIVIDER} />
        {state.events.map(event =>
          renderEventCard({
            imageSrc: { uri: event.pictures[0].image },
            title: event.name,
            subtitle: event.short_description,
            eventId: event.id,
          }),
        )}
        <View style={DIVIDER} />
      </Screen>
    </View>
  )
}
