import { NavigationInjectedProps } from "react-navigation"
import { ImageSourcePropType } from "react-native"

export interface SecondScreenProps extends NavigationInjectedProps<{}> {}

export interface SecondCardProps {
  imageSrc?: ImageSourcePropType
  title: string
  distance: number
  price: number
}
