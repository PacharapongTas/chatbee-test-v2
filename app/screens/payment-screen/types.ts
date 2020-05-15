import { NavigationInjectedProps } from "react-navigation"

export interface PaymentScreenProps extends NavigationInjectedProps<{}> {}

export interface IPicture {
    id: string;
    image: string;
}

export interface IEvent {
    id: string;
    pictures: IPicture[];
    name: string;
    description: string;
    background_picture?: IPicture;
}

export interface IChallenge {
    id: string;
    pictures: IPicture[];
    event: IEvent;
    distance: number;
    price: number;
    description: string;
    type: number;
    created_at: string;
    badge: number;
}

export interface IDelivery {
    id: number;
    type: string;
    value: number;
}

export interface ICoupon {
    id: number
    slug: string
    amount: number
}