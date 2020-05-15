import { ImageSourcePropType } from "react-native"
import { NavigationInjectedProps } from "react-navigation"

export interface MainScreenProps extends NavigationInjectedProps<{}> {}

export interface MainCardProps {
  imageSrc?: ImageSourcePropType
  title: string
  subtitle: string
  eventId: string
}
