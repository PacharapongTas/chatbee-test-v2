import { PinIcon } from './pin-icon';
import { ShoeIcon } from './shoe-icon';

export const modalPresets = {
  pin: {
    icon: ShoeIcon,
    title: 'ระยะทางที่วิ่งไปแล้ว',
  },
  point: {
    icon: PinIcon,
    title: 'ผ่านจุดนี้แล้ว',
  }
};

export type ModalPresetNames = keyof typeof modalPresets;
