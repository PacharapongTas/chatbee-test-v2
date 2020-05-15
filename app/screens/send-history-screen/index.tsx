import React, { useState, useEffect, Fragment } from "react"
import { View, StatusBar } from "react-native"

import { FULL, SCREEN, LINE } from "./styles"
import { Screen, Header, CollapsibleCard } from "../../components"
import { fetchSubmitData } from "../../services/api"

export const SendHistoryScreen = ({ navigation }) => {
  const [state, setState] = useState({
    loading: true,
    groupedSubmitData: [],
  })

  useEffect(() => {
    fetchSubmitData().then(data => {
      let SubmitDataByMonth = {}
      data.forEach(item => {
        SubmitDataByMonth = groupItemByCreatedDate(SubmitDataByMonth, item)
      })
      const groupedSubmitData = []
      Object.keys(SubmitDataByMonth).forEach(year => {
        Object.keys(SubmitDataByMonth[year]).forEach(month => {
          groupedSubmitData.push(SubmitDataByMonth[year][month])
        })
      })
      setState({ ...state, groupedSubmitData, loading: false })
    })
  }, [])

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

  const goBack = () => navigation.goBack()

  return (
    <View style={FULL}>
      <StatusBar backgroundColor="transparent" translucent />
      <Header headerText="ประวัติการส่งผลการวิ่ง" leftIcon="back" onLeftPress={goBack} />
      <Screen preset="scroll" loading={state.loading} style={SCREEN}>
        {state.groupedSubmitData.map((items, index) => (
          <Fragment key={index}>
            <CollapsibleCard items={items} navigation={navigation} />
            <View style={LINE} />
          </Fragment>
        ))}
      </Screen>
    </View>
  )
}
