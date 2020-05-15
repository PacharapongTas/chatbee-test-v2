
import { IStopProps } from './map.props';


const START_INNER_POINT_COLOR = '#00F8FD';
const STAR_BORDER_POINT_COLOR = '#281962';

const CHECK_INNER_POINT_COLOR = '#FF00A5';
const CHECK_BORDER_POINT_COLOR = '#281962';

export const START_POINT_GRAD: IStopProps[] = [
    { offset: 0, stopColor: '#00f8fd' },
    { offset: 0.047, stopColor: '#02e8f1' },
    { offset: 0.243, stopColor: '#0ea9c6' },
    { offset: 0.43, stopColor: '#1776a2' },
    { offset: 0.605, stopColor: '#1e4d86' },
    { offset: 0.763, stopColor: '#233072' },
    { offset: 0.9, stopColor: '#261f66' },
    { offset: 1, stopColor: '#281962' }
  ];
  
  
  export const CHECK_POINT_GRAD: IStopProps[] = [
    { offset:0, stopColor:"#ff00a5" },
    { offset:0.024, stopColor:"#f700a2" },
    { offset:0.225, stopColor:"#b8088f" },
    { offset:0.417, stopColor:"#850e7f" },
    { offset:0.595, stopColor:"#5c1272" },
    { offset:0.757, stopColor:"#3f1669" },
    { offset:0.898, stopColor:"#2e1863" },
    { offset:1, stopColor:"#281962" },
  ];

export const pointPresets = {
    start: {
        grad: START_POINT_GRAD,
        inner: START_INNER_POINT_COLOR,
        border: STAR_BORDER_POINT_COLOR
    },
    check: {
        grad: START_POINT_GRAD,
        inner: CHECK_INNER_POINT_COLOR,
        border: CHECK_BORDER_POINT_COLOR
    }
}


export type PointPresetNames = keyof typeof pointPresets