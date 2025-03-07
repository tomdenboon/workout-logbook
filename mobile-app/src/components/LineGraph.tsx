import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import {
  Canvas,
  Circle,
  Line,
  Path,
  Points,
  Skia,
  vec,
} from '@shopify/react-native-skia';
import WlbText from 'components/WlbText';
import { useTheme } from 'context/theme';

interface LineGraphI {
  data: any[];
  containerHeight?: number;
  period?: '3months' | '1year' | '';
}

const LineGraph = ({ data = [], containerHeight = 140 }) => {
  const chartRef = useRef<View>(null);
  const xAxisRef = useRef<View>(null);
  const yAxisRef = useRef<View>(null);
  const theme = useTheme();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    chartRef.current?.measure((x, y, w, h, pX, pY) => {
      setWidth(w);
      setHeight(h);
    });
  }, [chartRef]);

  const chartData = useMemo(() => {
    if (data.length === 0) {
      // Sample data with dates and values
      return [
        { date: new Date('2025-01-01'), value: 42 },
        { date: new Date('2025-01-15'), value: 89 },
        // { date: new Date('2025-02-01'), value: 63 },
        // { date: new Date('2025-02-15'), value: 120 },
        // { date: new Date('2025-03-01'), value: 75 },
        // { date: new Date('2025-03-15'), value: 52 },
      ];
    }
    return data;
  }, [data]);

  // Find min and max values
  const { minValue, maxValue } = useMemo(() => {
    let min = Math.min(...chartData.map((item) => item.value));
    let max = Math.max(...chartData.map((item) => item.value));

    min = Math.floor(min / 10) * 10;
    max = Math.ceil(max / 10) * 10;

    return {
      minValue: min,
      maxValue: max,
    };
  }, [chartData]);

  const points = useMemo(() => {
    const getX = (index: number) => {
      return 4 + (index / (chartData.length - 1)) * (width - 8);
    };

    const getY = (value: number) =>
      height - 4 - ((value - minValue) / (maxValue - minValue)) * (height - 8);

    return chartData.map((p, i) => ({ x: getX(i), y: getY(p.value) }));
  }, [chartData, width, height, minValue, maxValue]);

  // Calculate which points to show tickers for
  const tickerPoints = useMemo(() => {
    const minSpacing = 60; // Minimum pixels between tickers
    let step = 1;

    // Increase step size until we have enough space between tickers
    while (width / Math.ceil(chartData.length / step) < minSpacing) {
      step++;
    }

    return chartData.filter((_, i) => i % step === 0);
  }, [chartData, width]);

  console.log(tickerPoints);

  return (
    <View
      style={{ flex: 1, height: containerHeight, flexDirection: 'row', gap: 4 }}
    >
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginVertical: -6,
        }}
      >
        <WlbText>{maxValue}</WlbText>
        <WlbText>{minValue}</WlbText>
      </View>
      <View
        style={{
          flex: 1,
        }}
        ref={chartRef}
      >
        <Canvas
          style={{
            flex: 1,
          }}
        >
          <Line
            p1={vec(0, 4)}
            p2={vec(width, 4)}
            color={theme.sub}
            strokeWidth={2}
          />
          <Line
            p1={vec(0, height - 4)}
            p2={vec(width, height - 4)}
            color={theme.sub}
            strokeWidth={2}
          />
          <Points
            points={points.map((p) => vec(p.x, p.y))}
            strokeWidth={2}
            color={theme.main}
            style="stroke"
            mode="polygon"
          />
          {points.map((p) => (
            <Circle cx={p.x} cy={p.y} r={4} color={theme.main} />
          ))}
        </Canvas>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 8,
          }}
        >
          {tickerPoints.map((point, i) => (
            <View
              key={i}
              style={{
                position: 'absolute',
                left: points[chartData.indexOf(point)].x - 30,
              }}
            >
              <WlbText>
                {point.date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </WlbText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default LineGraph;
