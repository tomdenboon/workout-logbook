import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export default function useMeasureLayout() {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [px, setPx] = useState(0);
  const [py, setPy] = useState(0);

  const handleLayout = (e: LayoutChangeEvent) => {
    e.target.measure((x, y, w, h, pX, pY) => {
      setWidth(w);
      setHeight(h);
      setX(x);
      setY(y);
      setPx(pX);
      setPy(pY);
    });
  };

  return { width, height, x, y, px, py, handleLayout };
}
