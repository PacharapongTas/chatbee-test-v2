import { NavigationInjectedProps } from "react-navigation"
import { ImageSourcePropType } from "react-native"

export interface ChallengesScreenProps extends NavigationInjectedProps<{}> {}

export interface ChallengeCardProps {
  imageSrc?: ImageSourcePropType
  title: string
  distance: number
  price: number
  challengeId: string
}
