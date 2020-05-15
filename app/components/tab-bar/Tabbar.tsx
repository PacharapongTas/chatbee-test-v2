import React from "react"
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import * as shape from "d3-shape"
import Svg, { Path, Defs, LinearGradient as LinearGradientSVG, Stop } from "react-native-svg"

import { color } from "../../theme/color"
import { NavigationState } from "react-navigation"

const { width: screenWidth } = Dimensions.get("window")

const height = 80

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    top: -10,
    justifyContent: "center",
    alignItems: "center",
    height: 64,
  },
  activeIcon: {
    backgroundColor: "red",
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
})

interface OverwriteProps {
  style?: ViewStyle
  activeTintColor?: string
  inactiveTintColor?: string
  allowFontScaling?: boolean
  labelStyle?: any
  tintColor?: string
}

interface RNProps {
  navigation: {
    state: NavigationState
  }
  onTabPress: ({ route }: { route: any }) => void
  renderIcon?: any
  getLabelText: (props: { route: any }) => any
}

interface State {
  previousIndex: null | number
}

type Props = RNProps & OverwriteProps

export class Tabbar extends React.Component<Props, State> {
  data: any

  state = {
    previousIndex: null,
  }

  constructor(props: Props) {
    super(props)

    const centerPoint = screenWidth / 2

    const marginY = 31.05

    const curveData = [
      { x: centerPoint + 36, y: marginY + 16 },
      { x: centerPoint + 26, y: marginY + 14 },
      { x: centerPoint + 18, y: marginY + 5.25 },
      { x: centerPoint + 10, y: marginY + 2 },
      { x: centerPoint, y: marginY },
      { x: centerPoint - 10, y: marginY + 2 },
      { x: centerPoint - 18, y: marginY + 5.25 },
      { x: centerPoint - 26, y: marginY + 14 },
      { x: centerPoint - 36, y: marginY + 16 },
    ]

    const curve: any = shape
      .line()
      .x((d: any) => d.x)
      .y((d: any) => d.y)
      .curve(shape.curveBasis)

    const rectData = [
      { x: screenWidth, y: height / 1.7 },
      { x: screenWidth, y: height * 1.7 },
      { x: 0, y: height * 1.7 },
      { x: 0, y: height / 1.7 },
    ]

    const rectLine: any = shape
      .line()
      .x((d: any) => d.x)
      .y((d: any) => d.y)

    this.data = `${curve(curveData)} ${rectLine(rectData)}`
  }

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>): boolean {
    return (
      nextProps.navigation.state.index !== this.props.navigation.state.index ||
      this.state.previousIndex !== nextState.previousIndex
    )
  }

  renderItem = (route, index) => {
    const { navigation } = this.props
    const { state } = navigation
    const focused = state.index === index

    return (
      <TouchableWithoutFeedback onPress={() => this.props.onTabPress({ route })} key={index}>
        <View style={[styles.tab, { opacity: focused ? 1 : 0.5 }]}>
          {this.props.renderIcon({ route })}
          {this.props.getLabelText({ route })}
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    const { navigation } = this.props
    const { state } = navigation
    const { routes } = state

    return (
      <SafeAreaView style={{ height, backgroundColor: "transparent" }}>
        <View style={StyleSheet.absoluteFill}>
          <Svg
            width="100%"
            style={{
              height: height * 2,
              top: -height + 5,
            }}
            fill="url(#grad)"
          >
            <Defs>
              <LinearGradientSVG id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="27.5%" stopColor={color.palette.lipstick} />
                <Stop offset="100%" stopColor={color.palette.purple} />
              </LinearGradientSVG>
            </Defs>
            <Path d={this.data} translateY={20} />
          </Svg>
        </View>
        <View style={{ flexDirection: "row" }}>
          {routes.map((route, index) => this.renderItem(route, index))}
        </View>
      </SafeAreaView>
    )
  }
}
