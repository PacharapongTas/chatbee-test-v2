import { create } from "apisauce"
import AsyncStorage from "@react-native-community/async-storage"
import { LoginManager, AccessToken } from "react-native-fbsdk"
import Toast from "react-native-simple-toast"

import { DEFAULT_API_CONFIG } from "./api-config"
import { Platform } from "react-native"

export const KEY_TOKEN = 'token'
const KEY_EXPIRE_TIME = 'expTime'
const KEY_USER_DATA = 'userData'

interface IRequest {
  method: "get" | "post" | "put"
  url: string
  params?: object
  axiosConfig?: object
  successText?: string
}

export const Api = create({
  baseURL: DEFAULT_API_CONFIG.url,
  timeout: DEFAULT_API_CONFIG.timeout,
  headers: {
    Accept: "application/json",
  },
})

const request = async ({
  method,
  url,
  params,
  axiosConfig,
  successText,
}: IRequest): Promise<any> => {
  const token = await AsyncStorage.getItem(KEY_TOKEN)
  if (token) {
    Api.setHeader("Authorization", `Token ${token}`)
  }
  // @ts-ignore
  const response = await Api[method](url, params, axiosConfig)
  if (response.ok) {
    if (successText) {
      Toast.showWithGravity(successText, Toast.LONG, Toast.TOP)
    }

    return Promise.resolve(response.data)
  } else {
    console.log(response.data);
    let errorMessage = ''
    if (typeof response.data === "object") {
      const responseError = response.data[Object.keys(response.data)[0]]
      errorMessage = responseError
    } else {
      errorMessage = 'Internal Server Error'
    }
    
    // Hack
    // setTimeout(() => Toast.showWithGravity(errorMessage, Toast.LONG, Toast.TOP), 100);
    return Promise.reject({
      detail: errorMessage
    })
  }
}

const setTokenToAsyncStorage = (data) => {
  AsyncStorage.setItem(KEY_USER_DATA, JSON.stringify(data.user))
  const inNextDay = 30
  const expTime = new Date().getTime() + inNextDay * 24 * 60 * 60 * 1000
  AsyncStorage.setItem(KEY_EXPIRE_TIME, expTime.toString())
  AsyncStorage.setItem(KEY_TOKEN, data.token)
}

export const sendFcmToken = async (fcmRequest) => {
  const data = await request({
    method: "post",
    url: `/devices/`,
    params:fcmRequest,
  })

  return Promise.resolve(data)
}

export const authWithFacebook = async () => {
    const { isCancelled } = await LoginManager.logInWithPermissions([
      "public_profile",
      "user_friends",
    ])

    if (!isCancelled) {
      const { accessToken } = await AccessToken.getCurrentAccessToken()

      const data = await request({
        method: "post",
        url: "/users/authenticate_facebook/",
        params: {
          access_token: accessToken,
        },
        successText: "เข้าสู่ระบบสำเร็จ",
      })

      setTokenToAsyncStorage(data)
      return Promise.resolve(data)
    } else {
      return Promise.reject({detail: 'ยกเลิก'})
    }
}


export const linkFacebook = async () => {
  const { isCancelled } = await LoginManager.logInWithPermissions([
    "public_profile",
    "user_friends",
  ])

  if (!isCancelled) {
    const { accessToken } = await AccessToken.getCurrentAccessToken()
    console.log(accessToken);

    const data = await request({ method: "post", url: `/users/link_facebook/`, params: {access_token: accessToken} })

    return Promise.resolve(data)
  } else {
    return Promise.reject({detail: 'ยกเลิก'})
  }
}

export const authWithApple = async (authorization_code, first_name, last_name) => {
    const data = await request({
      method: "post",
      url: "/users/authenticate_apple/",
      params: {
        authorization_code,
        first_name,
        last_name,
      },
      successText: "เข้าสู่ระบบสำเร็จ",
    })

    setTokenToAsyncStorage(data)
    return Promise.resolve(data)
}

export const logout = async () => {
  try {
    await AsyncStorage.setItem(KEY_USER_DATA, '')
    await AsyncStorage.setItem(KEY_EXPIRE_TIME, '')
    await AsyncStorage.setItem(KEY_TOKEN, '')
    
    await request({ method: "post", url: "/users/logout_view/" })
    Promise.resolve()
  } catch {
    Promise.reject()
  }
}

export const fetchEvents = (name?: string) => request({ method: "get", url: "/events/", params: {name} })

export const fetchChallenges = (eventId: string) =>
  request({ method: "get", url: `/events/${eventId}/challenges/` })

export const getChallenge = (challengeId: string) =>
  request({ method: "get", url: `/challenges/${challengeId}/` })

export const uploadImage = (image: any) =>
  request({ method: "post", url: `/pictures/`, params: image })

export const getLeaderboard = params => request({ method: "get", url: "/leaderboards/", params })

export const getLeaderboardFriendRank = params =>
  request({
    method: "get",
    url: "/leaderboards/friend_ranks/",
    params,
  })

export const getLeaderboardMyRank = params =>
  request({
    method: "get",
    url: "/leaderboards/my_rank/",
    params,
  })

export const submitChallengeData = async (challengeId, challengeData) =>
  request({
    method: "post",
    url: `/challenges/${challengeId}/submit_data/`,
    params: challengeData,
    successText: "บันทึกสำเร็จ",
  })

export const fetchSubmitData = () => request({ method: "get", url: `/me/submit_datas/` })

export const getMe = () => request({ method: "get", url: "/me/" })

export const getStatistic = () => request({ method: "get", url: "/me/statistic/" })

export const updateProfile = userProfile =>
  request({
    method: "put",
    url: "/me/update_me/",
    params: userProfile,
  })

export const createApplication = applications =>
  request({
    method: "post",
    url: `/applications/`,
    params: applications,
  })

export const fetchApplications = (isActive?: boolean) =>
  typeof isActive === "boolean"
    ? request({ method: "get", url: "/me/applications/", params: { active: isActive } })
    : request({ method: "get", url: "/me/applications/" })

  export const uplopadPaymentSlip = (applicationId, slipImage, paidAt) => {
    const formData = new FormData()

    formData.append('paid_at', paidAt)
    formData.append("slip", {
      ...slipImage,
      name: "image.jpg",
      paid_at: paidAt,
      type: 'image/jpeg',
    })

    return request({
      method: "put",
      url: `/applications/${applicationId}/upload_slip/`,
      params: formData,
    })
  }

export const payWithInternetBanking = (applicationId, type) =>
  request({
    method: "put",
    url: `/applications/${applicationId}/pay_with_internet_banking/`,
    params: type,
    successText: "บันทึกข้อมูลสำเร็จ",
  })

export const payWithCreditCard = (applicationId, omise_token) =>
  request({
    method: "put",
    url: `/applications/${applicationId}/pay_with_credit_card/`,
    params: omise_token,
    successText: "บันทึกข้อมูลสำเร็จ",
  })

export const payCaptureComplete = (applicationId, applications) =>
  request({
    method: "put",
    url: `/applications/${applicationId}/capture/`,
    params: applications,
    successText: "บันทึกสำเร็จ",
  })

export const verifyChargePaid = (applicationId) =>
  request({
    method: "get",
    url: `/applications/${applicationId}/verify_charge_paid/`
  })

export const getApplied = challengeId =>
  request({ method: "get", url: `/challenges/${challengeId}/applied/` })

export const fetchFriends = (params?: any) =>
  request({ method: "get", url: `/me/friends/`, params })

export const followFriend = (friendId: number) =>
  request({ method: "post", url: `/users/${friendId}/follow/` })

export const unfollowFriend = (friendId: number) =>
  request({ method: "post", url: `/users/${friendId}/unfollow/` })

export const getMap = challengeId =>
  request({ method: "get", url: `/my_challenges/${challengeId}/map/` })

export const getMyChallengeStatistic = challengeId =>
  request({ method: "get", url: `/my_challenges/${challengeId}/statistic/` })

export const getCities = () => request({ method: "get", url: "/cities/" })

export const getDistricts = cityId =>
  request({ method: "get", url: `/cities/${cityId}/districts/` })

export const getSubDistricts = districtId =>
  request({ method: "get", url: `/districts/${districtId}/sub_districts` })

export const fetchFeeds = (params?: any) => request({ method: "get", url: "/feeds/", params })

export const fetchDeliveries = () => request({ method: "get", url: "/applications/deliveries/" })

export const fetchCoupon = (challengeId: number, code: string) => request({ method: "get", url: "/coupon/", params: {challenge_id: challengeId, code} })
