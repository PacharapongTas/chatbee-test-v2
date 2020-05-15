import numeral from 'numeral';
import * as React from 'react';
import { Circle, ClipPath, Defs, Image } from 'react-native-svg';
import { color } from '../../theme';
import { LineDash } from './line';
import { ITransform } from './map.props';
import { PinModal } from './modal';
import { PinPresetNames, pinPresets } from './pin.presets';

interface IMyPinProps {
  x: number;
  y: number;
  transform: ITransform;
  imageUrl: string;
  distance: number;
  preset: PinPresetNames;
}

interface IMyPinStates {
  isShow: boolean;
}

export class Pin extends React.PureComponent<IMyPinProps, IMyPinStates> {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false
    };
  }

  render() {
    const { x, y, transform, imageUrl, distance, preset } = this.props;
    const { radius, bottomMargin, shouldShowBorder } = pinPresets[preset];

    const widthHeight = radius * 8

    const imageX = x + transform.translateX - radius - 18
    const imageY = y + transform.translateY - bottomMargin - 66 
    const circleX = imageX + (radius * 8)/2
    const circleY = imageY + (radius * 8)/2

    const clipPathId = `clip-${imageUrl}`
    const clipPath = `url(#${clipPathId})`

    return (
      <PinModal
        preset="pin"
        x={x + transform.translateX - 104}
        y={y + transform.translateY - radius * 3.5 - 138}
        desc={`${numeral(distance).format('0.0[0]')} กิโลเมตร`}
      >
        <LineDash
          x={x + transform.translateX}
          y1={y + transform.translateY - bottomMargin - 12}
          y2={y + transform.translateY}
          color={color.palette.white}
        />
        <Circle
          cx={x + transform.translateX}
          cy={y + transform.translateY - bottomMargin + radius - 48}
          r={radius + 22}
          strokeOpacity={1}
          fillOpacity={0}
          opacity={shouldShowBorder ? 1 : 0}
          stroke={color.palette.white}
        />
          <Defs>
    <ClipPath id={clipPathId}>
    <Circle cx={circleX} cy={circleY} r={widthHeight/2} />
    </ClipPath>
  </Defs>
  <Circle cx={circleX} cy={circleY} r={widthHeight/2} />
  <Image
    x={imageX}
    y={imageY}
    width={widthHeight}
    height={widthHeight}
    preserveAspectRatio="xMidYMid slice"
    href={{ uri: imageUrl }}
    clipPath={clipPath}
  />

      </PinModal>
    );
  }
}
