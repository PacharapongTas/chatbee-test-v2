import numeral from "numeral"
import * as React from "react"
import { Animated, ImageBackground, View } from "react-native"
import { Path, Svg } from "react-native-svg"
import * as path from "svg-path-properties"
import { color } from "../../theme"
import { IMapProps, IPoint, IProgress } from "./map.props"
import { Pin } from "./pin"
import { PinFriend } from "./pin-friends"
import { Point } from "./point"
import { calcLengthFromPercentage, calcPercentage } from "./utils"
import { IEvent } from "../../screens/payment-screen/types"
const AnimatedPath = Animated.createAnimatedComponent(Path)

const delay = 1000
const duration = 1000

interface IProps {
  event: IEvent
}

export class Map extends React.Component<IProps & IMapProps> {
  length: number
  startPoint: IPoint
  strokeDashoffset: any
  properties: ReturnType<typeof path.svgPathProperties>

  constructor(props) {
    super(props)
    const { svg } = this.props

    this.properties = path.svgPathProperties(svg.dash)
    this.length = this.properties.getTotalLength()

    this.startPoint = this.properties.getPropertiesAtLength(this.length)
    this.strokeDashoffset = new Animated.Value(this.length)
  }

  checkDistance = (distance, totalDistance) => {
    if(distance < totalDistance) {
      return distance
    }else {
      return totalDistance
    }
  }
  
  animate = () => {
    const { totalDistance, myProgress } = this.props

    const myProgressPercentage = calcPercentage(totalDistance, this.checkDistance(myProgress.distance, totalDistance))

    this.strokeDashoffset.setValue(this.length)

    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(this.strokeDashoffset, {
        toValue: this.length - calcLengthFromPercentage(this.length, myProgressPercentage),
        duration: duration,
        useNativeDriver: true,
      }),
    ]).start()
  }

  componentDidMount() {
    const { myProgress } = this.props

    if (myProgress && myProgress.distance) {
      this.animate()
    }
  }

  getPointFromDistance = (distance: number): IPoint => {
    let percentage = calcPercentage(this.props.totalDistance, distance)

    if (percentage > 100) {
      percentage = 100
    }

    return this.properties.getPointAtLength(
      calcLengthFromPercentage(this.length, percentage))
  }

  renderFriendPin = ({ distance, imageUrl }: IProgress) => {
    const { x, y } = this.getPointFromDistance(distance)

    const {
      svg: { transform },
    } = this.props

    return (
      <PinFriend
        preset="friendPin"
        x={x}
        y={y}
        transform={transform}
        imageUrl={imageUrl}
        distance={distance}
        key={`${distance} ${imageUrl}`}
      />
    )
  }

  renderMyPin = ({ distance, imageUrl }: IProgress) => {
    const { x, y } = this.getPointFromDistance(distance)
    const {
      svg: { transform },
    } = this.props

    this.animate()

    return (
      <Pin
        preset="myPin"
        x={x}
        y={y}
        transform={transform}
        imageUrl={imageUrl}
        distance={distance}
      />
    )
  }

  getSubtDistance = () => {
    const { numberOfCheckPoint, totalDistance } = this.props

    return totalDistance / numberOfCheckPoint
  }

  renderCheckPoints = () => {
    const {
      svg: { transform },
      numberOfCheckPoint,
    } = this.props
    const points = Array(numberOfCheckPoint).fill(null)

    const subtDistance = this.getSubtDistance()

    return points.map((point, index) => {
      if (index === points.length - 1) {
        return null
      }

      const { x, y } = this.getPointFromDistance(subtDistance * (index + 1))

      const desc = `${numeral(subtDistance).format("0[.]0[00]")} km`

      return (
        <Point
          x={x + transform.translateX}
          y={y + transform.translateY}
          key={index}
          title={`Check Point ${index + 1}`}
          desc={desc}
        />
      )
    })
  }

  render() {
    const {
      event,
      svg: { dash, transform },
      friendProgresses = [],
      myProgress,
    } = this.props

    return (
      <View style={{ aspectRatio: 4/3, overflow: 'visible' }}>
        <ImageBackground source={{ uri: event.background_picture ? event.background_picture.image : '' }} imageStyle={{resizeMode: 'contain'}} style={{width: '100%', height: '100%'}}>
        <Svg
          width="100%"
          height="100%"
          viewBox="0 0 640 360"
          preserveAspectRatio="xMidYMid meet"
          fill={color.palette.cloudBurst}
          stroke={color.palette.electricViolet}
          color="green"
          x="0px"
          y="0px"
        >
          <Path d={dash} strokeWidth="1" transform={transform} fillOpacity={0} />
          <Path
            d={dash}
            stroke={color.palette.doveGray}
            y="10"
            strokeWidth="1"
            transform={transform}
            fillOpacity={0}
            strokeOpacity={0.1}
          />
          <AnimatedPath
            d={dash}
            id="path"
            stroke="white"
            strokeWidth="1"
            transform={transform}
            strokeDasharray={[this.length, this.length]}
            strokeDashoffset={this.strokeDashoffset}
            fillOpacity={0}
          />
          {this.renderCheckPoints()}
          {friendProgresses.map(p => this.renderFriendPin(p))}
          {myProgress && this.renderMyPin(myProgress)}
        </Svg>
        </ImageBackground>
      </View>
    )
  }
}
