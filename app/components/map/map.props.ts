import { Color } from 'react-native-svg'
import { IEvent } from '../../screens/payment-screen/types';

export interface IProgress {
  distance: number;
  imageUrl: string;
}

export interface ITransform {
  translateX: number;
  translateY: number;
}

export interface ISvgProps {
  dash: string;
  transform: ITransform;
}

export interface IMapProps {
  svg: ISvgProps;
  totalDistance: number;
  myProgress?: IProgress;
  friendProgresses?: IProgress[];
  numberOfCheckPoint: number;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IStopProps {
  stopColor: Color;
  offset: number;
}
