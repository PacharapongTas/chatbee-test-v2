import { IChallenge, IDelivery, ICoupon } from "../screens/payment-screen/types";

export class Payment {
  static calculateFinalPrice = (challenge: IChallenge, delivery: IDelivery, coupon: ICoupon | null) => {
    let finalPrice = challenge.price + delivery.value
    if (coupon) {
      finalPrice = finalPrice - coupon.amount;
    }

    return finalPrice > 0 ? finalPrice : 0
  }
}