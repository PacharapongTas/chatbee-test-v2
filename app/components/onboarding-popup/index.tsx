import React, { useState } from "react";
import { ImageBackground, Modal, StyleSheet, Text, TextStyle, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Swiper from 'react-native-swiper';
import { color } from "../../theme";
import { PrimaryButton } from "../button/primary-button";
import { Icon } from "../icon/icon";
import { CLOSE_CONTAINER } from "../size-chart-modal/styles";

const BACKGROUND: ViewStyle = {
  backgroundColor: "rgba(0,0,0,0.5)",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
}


const CONTAINER: ViewStyle = {
  position: "relative",
  height: '75%',
  width: '90%',
  backgroundColor: color.darkBackground,
  borderRadius: 8,
}


const TITLE: TextStyle = {
  fontSize: 24,
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: 40,
}

const DESCRIPTION: TextStyle = {
  fontSize: 14,
  color: 'white',
  textAlign: 'center',
}

const BUTTON_CONTAINER: ViewStyle =  {width: '100%', paddingHorizontal: 38,marginBottom: 32}

const BUTTON_VIEW: ViewStyle = {flex: 1, flexDirection:'row',  alignItems: 'flex-end'}



const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    // paddingTop: 40,
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

const Onboarding1 = require("../../assets/images/onboarding-1.png")
const Onboarding2 = require("../../assets/images/onboarding-2.png")
const Onboarding3 = require("../../assets/images/onboarding-3.png")
const Onboarding4 = require("../../assets/images/onboarding-4.png")
const Onboarding5 = require("../../assets/images/onboarding-5.png")
const Onboarding6 = require("../../assets/images/onboarding-6.png")
const Onboarding7 = require("../../assets/images/onboarding-7.png")

interface IProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

export function OnboardingPopup({ visible, onCancel,onSubmit }: IProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const contents = [
    {
      title: 'วิธีการเริ่มต้น',
      imageSource: Onboarding1,
    },
    {
      title: 'เลือกชาเลนจ์',
      imageSource: Onboarding2,
    },
    {
      title: 'เลือกระยะทาง',
      imageSource: Onboarding3,
    },
    {
      title: 'กดปุ่มลงสมัคร',
      imageSource: Onboarding4,
    },
    {
      title: 'ออกไปวิ่งด้วยแอปอะไรก็ได้\nหรือบนลู่วิ่ง',
      imageSource: Onboarding5,
    },
    {
      title: 'อัปโหลดผลการวิ่ง',
      subtitle: '(รูปที่แนบมาต้องมีระยะทางและเวลาวิ่งแสดงอย่างชัดเจน)',
      imageSource: Onboarding6,
    },
    {
      title: '“เรียบร้อย”\nคุณได้เข้าร่วมการแข่งขัน',
      imageSource: Onboarding7,
    }
  ]

  return (
    <Modal transparent={true} visible={visible} animationType="fade" >
      <View style={BACKGROUND}>
        <View style={CONTAINER}>
          <Swiper 
          loop={false}
          loadMinimal={true}
           style={styles.wrapper}
           showsPagination={activeIndex +1 !== contents.length}
           showsButtons={false} 
           dotColor={color.dim} 
           activeDotColor={'white'} 
           dotStyle={{width: 5, height: 5, borderRadius: 5}} 
           activeDotStyle={{width: 7, height: 7, borderRadius: 7}}
           onIndexChanged={(index) => setActiveIndex(index)}
           >
            {contents.map((content, index) => (
              <View style={styles.slide1} key={index}>
              <ImageBackground source={content.imageSource} imageStyle={{ resizeMode: 'contain', height: '95%' }} style={{ width: '100%', height: '100%' }}>
                <Text style={TITLE}>{content.title}</Text>
                {content.subtitle ? <Text style={DESCRIPTION}>{content.subtitle}</Text> : null}
                {index + 1 === contents.length ? 
                <View style={BUTTON_VIEW}>
                  <View style={BUTTON_CONTAINER}>
                <PrimaryButton style={{height: 50}} onPress={onSubmit}><Text style={{color: 'white',fontSize: 15, fontWeight: '500'}}>เริ่มเล่นฟรีตอนนี้</Text></PrimaryButton> 
                </View>
                </View>
                : null}
              </ImageBackground>
            </View>
            ))}
          </Swiper>
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={CLOSE_CONTAINER}>
                  <Icon icon="circularClose" />
                </View>
              </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  )
}