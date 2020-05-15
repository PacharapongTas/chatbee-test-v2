import { ImageSourcePropType } from "react-native"
import { NavigationInjectedProps } from "react-navigation"

export interface ChallengeDetailScreenProps extends NavigationInjectedProps<{}> {}

export interface RewardCardProps {
  key: any,
  imageSrc: ImageSourcePropType
  title: string
  subtitle: string
}
