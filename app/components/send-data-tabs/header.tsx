import React from "react";
import { Header } from "../header/header"
import { Fragment, useState } from "react";
import { NavigationEvents } from "react-navigation";
import { fetchSubmitData } from "../../services/api";

export function SendDataHeader({navigation}) {
  const [showHistory, setShowHistory] = useState(false)

  const fetchData = async () => {
    const submitData = await fetchSubmitData()
    setShowHistory(!!submitData.length)
  }

  const goToSendHistoryScreen = () => navigation.navigate("SendHistory")

  const hasChallengeParam = !!navigation.getParam("challenge")
  
  return <Fragment>
          <NavigationEvents onDidFocus={() => fetchData()} />
      <Header
        headerText="ส่งผลการวิ่ง"
        leftIcon={hasChallengeParam ? "back" : null}
        onLeftPress={() => (hasChallengeParam ? navigation.goBack() : null)}
        rightIcon={showHistory ? "history" : null}
        onRightPress={showHistory ? goToSendHistoryScreen : null}
      />
  </Fragment>
}