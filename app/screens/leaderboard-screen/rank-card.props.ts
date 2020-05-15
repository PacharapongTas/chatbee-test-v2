interface IProfile {
  profile_picture: {
    image: string
  }
}

interface IUser {
  username: string
  first_name: string
  last_name: string
  email: string
  user_profile: IProfile
}

export interface IRankCardProps {
  user: IUser
  rankNumber: number
  event_name: string
  total_distance: number
  total_time: number
  border?: boolean
  row_number: number
}
