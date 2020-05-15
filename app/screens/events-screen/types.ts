import { ImageSourcePropType } from "react-native"
import { NavigationInjectedProps } from "react-navigation"

export interface EventsScreenProps extends NavigationInjectedProps<{}> {}

export interface EventCardProps {
  imageSrc?: ImageSourcePropType
  title: string
  subtitle: string
  eventId: string
}
