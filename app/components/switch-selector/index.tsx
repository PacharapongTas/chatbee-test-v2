import React, { Component } from "react"
import {
  Animated,
  Easing,
  I18nManager,
  PanResponder,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"

import { ISwitchSelectorProps, ISwitchSelectorStates } from "./switch-selector.props"
import { color } from "../../theme/color"

const LinearGradientAnimated = Animated.createAnimatedComponent(LinearGradient)

export class SwitchSelector extends Component<ISwitchSelectorProps, ISwitchSelectorStates> {
  _panResponder: any
  animatedValue: Animated.Value

  static defaultProps = {
    backgroundColor: color.palette.dualBlue,
    borderRadius: 30,
    buttonMargin: 0,
    buttonColor: "#BCD635",
    returnObject: false,
    animationDuration: 100,
    disabled: false,
    disableValueChangeOnPress: false,
    initial: -1,
  }

  constructor(props) {
    super(props)
    this.state = {
      selected: this.props.initial,
    }

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.shouldSetResponder,
      onMoveShouldSetPanResponder: this.shouldSetResponder,
      onPanResponderRelease: this.responderEnd,
      onPanResponderTerminate: this.responderEnd,
    })

    this.animatedValue = new Animated.Value(
      this.props.initial
        ? I18nManager.isRTL
          ? -(this.props.initial / this.props.options.length)
          : this.props.initial / this.props.options.length
        : 0,
    )
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.toggleItem(this.props.value, !this.props.disableValueChangeOnPress)
    }
  }

  shouldSetResponder = (evt, gestureState) => {
    return (
      evt.nativeEvent.touches.length === 1 &&
      !(Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5)
    )
  }

  responderEnd = (evt, gestureState) => {
    if (this.props.disabled) return
    const swipeDirection = this._getSwipeDirection(gestureState)
    if (swipeDirection === "RIGHT" && this.state.selected < this.props.options.length - 1) {
      this.toggleItem(this.state.selected + 1)
    } else if (swipeDirection === "LEFT" && this.state.selected > 0) {
      this.toggleItem(this.state.selected - 1)
    }
  }

  _getSwipeDirection(gestureState) {
    const { dx, dy, vx } = gestureState
    // 0.1 velocity
    if (Math.abs(vx) > 0.1 && Math.abs(dy) < 80) {
      return dx > 0 ? "RIGHT" : "LEFT"
    }
    return null
  }

  getBgColor() {
    const { selected } = this.state
    const { options, buttonColor } = this.props
    if (selected === -1) {
      return "transparent"
    }
    return options[selected].activeColor || buttonColor
  }

  animate = (value, last) => {
    this.animatedValue.setValue(last)
    Animated.timing(this.animatedValue, {
      toValue: value,
      duration: this.props.animationDuration,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start()
  }

  toggleItem = (index, callOnPress = true) => {
    const { options, returnObject, onPress } = this.props
    if (options.length <= 1 || index === null || isNaN(index)) return
    this.animate(
      I18nManager.isRTL ? -(index / options.length) : index / options.length,
      I18nManager.isRTL
        ? -(this.state.selected / options.length)
        : this.state.selected / options.length,
    )
    if (callOnPress && onPress) {
      onPress(returnObject ? options[index] : options[index].value)
    }

    this.setState({ selected: index })
  }

  render() {
    const { borderRadius, bold, disabled, buttonMargin } = this.props

    const options = this.props.options.map((element, index) => {
      const is_selected = this.state.selected == index

      return (
        <TouchableOpacity
          key={index}
          disabled={disabled}
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => this.toggleItem(index)}
        >
          <Text
            style={{
              fontSize: 10,
              fontWeight: bold ? "bold" : "normal",
              textAlign: "center",
              color: "#fff",
              backgroundColor: "transparent",
              opacity: is_selected ? 1 : 0.5,
            }}
          >
            {element.label}
          </Text>
        </TouchableOpacity>
      )
    })

    return (
      <View style={{ flexDirection: "row", width: options.length * 70 }}>
        <View {...this._panResponder.panHandlers} style={{ flex: 1 }}>
          <View
            style={{
              borderRadius: borderRadius,
              backgroundColor: "transparent",
              height: 30 + buttonMargin * 2,
            }}
            onLayout={event => {
              const { width } = event.nativeEvent.layout
              this.setState({
                sliderWidth: width - 2,
              })
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                borderColor: color.palette.flirt,
                borderRadius: borderRadius,
                borderWidth: 2,
              }}
            >
              {!!this.state.sliderWidth && (
                <LinearGradientAnimated
                  colors={[color.palette.lipstick, color.palette.purple]}
                  style={{
                    top: -2,
                    height: 30,
                    width: this.state.sliderWidth / this.props.options.length + 10,
                    transform: [
                      {
                        translateX: this.animatedValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-2, this.state.sliderWidth - 18],
                        }),
                      },
                    ],
                    borderRadius: borderRadius,
                    borderWidth: 0,
                    position: "absolute",
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              )}
              {options}
            </View>
          </View>
        </View>
      </View>
    )
  }
}
