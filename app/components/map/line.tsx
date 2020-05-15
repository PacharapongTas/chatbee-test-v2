import * as React from 'react';
import { Path } from 'react-native-svg';
import { Color } from 'react-native-svg'

interface ILineDashProps {
    x: number,
    y1: number;
    y2: number;
    color: Color
}

export class LineDash extends React.Component<ILineDashProps> {
  render() {
    const { x, y1, y2, color } = this.props;

    return (
      <Path
        d={`M${x} ${y1} ${x} ${y2}`}
        strokeWidth={0.5}
        stroke={color}
        strokeDasharray="1,1"
        opacity={1}
      />
    );
  }
}
