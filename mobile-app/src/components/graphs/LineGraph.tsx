import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import { useTheme } from 'context/theme';
import { Canvas, Line, vec, Points, Circle } from '@shopify/react-native-skia';
import WlbText from 'components/WlbText';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import useMeasureLayout from 'components/graphs/useMeasureLayout';
import {
  ChartDataPoint,
  Period,
  calculateMinMaxValues,
  generateTickerPoints,
  formatDateLabel,
} from 'components/graphs/chartUtils';

interface LineGraphI {
  data: ChartDataPoint[];
  valueFormatter?: (value: number) => string;
  containerHeight?: number;
  period?: Period;
}

const LineGraph = ({
  data = [],
  containerHeight = 180,
  period = '3months',
  valueFormatter = (value) => value.toFixed(1),
}: LineGraphI) => {
  const theme = useTheme();
  const [selectedPoint, setSelectedPoint] = useState<{
    x: number;
    y: number;
    date: number;
    value: number;
  } | null>(null);

  const { width, height, handleLayout: handleChartLayout } = useMeasureLayout();
  const { width: yAxisWidth, handleLayout: handleYAxisLayout } =
    useMeasureLayout();

  const isMeasured = width > 0 && height > 0;

  const { minValue, maxValue } = useMemo(() => {
    return calculateMinMaxValues(data);
  }, [data]);

  const points = useMemo(() => {
    const getX = (index: number) => {
      return 4 + (index / (data.length - 1)) * (width - 8);
    };

    const getY = (value: number) =>
      height - 4 - ((value - minValue) / (maxValue - minValue)) * (height - 8);

    return data.map((p, i) => ({
      x: getX(i),
      y: getY(p.value),
      date: p.date,
      value: p.value,
    }));
  }, [data, width, height, minValue, maxValue]);

  const tickerPoints = useMemo(() => {
    return generateTickerPoints(points, width);
  }, [points, width]);

  const findClosestPoint = (touchX: number) => {
    'worklet';
    if (points.length === 0) return null;

    return points.reduce((closest, current) =>
      Math.abs(touchX - current.x) < Math.abs(touchX - closest.x)
        ? current
        : closest,
    );
  };

  const touchGesture = Gesture.Tap().onStart((e) => {
    const point = findClosestPoint(e.x);

    if (point?.x === selectedPoint?.x) {
      runOnJS(setSelectedPoint)(null);
    } else {
      runOnJS(setSelectedPoint)(point);
    }
  });

  const panGesture = Gesture.Pan()
    .onStart((e) => {
      const point = findClosestPoint(e.x);
      runOnJS(setSelectedPoint)(point);
    })
    .onUpdate((e) => {
      const point = findClosestPoint(e.x);
      runOnJS(setSelectedPoint)(point);
    });

  return (
    <View
      style={{
        height: containerHeight,
        paddingBottom: 16,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', gap: 4, paddingRight: 8 }}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginVertical: -6,
          }}
          onLayout={handleYAxisLayout}
        >
          <WlbText size={12}>{valueFormatter(maxValue)}</WlbText>
          <WlbText size={12}>{valueFormatter(minValue)}</WlbText>
        </View>
        <GestureDetector
          gesture={Gesture.Simultaneous(touchGesture, panGesture)}
        >
          <View
            style={{
              flex: 1,
            }}
            onLayout={handleChartLayout}
          >
            {isMeasured ? (
              <Canvas
                style={{
                  flex: 1,
                }}
              >
                <Line
                  p1={vec(0, 4)}
                  p2={vec(width, 4)}
                  color={theme.subAlt}
                  strokeWidth={2}
                />
                <Line
                  p1={vec(0, height - 4)}
                  p2={vec(width, height - 4)}
                  color={theme.subAlt}
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
                  <Circle
                    key={p.x}
                    cx={p.x}
                    cy={p.y}
                    r={4}
                    color={theme.main}
                  />
                ))}

                {selectedPoint && (
                  <Line
                    p1={vec(selectedPoint.x, 4)}
                    p2={vec(selectedPoint.x, height - 4)}
                    color={theme.main}
                    strokeWidth={1}
                    style="stroke"
                  />
                )}
              </Canvas>
            ) : (
              <View style={{ flex: 1 }} />
            )}
          </View>
        </GestureDetector>
      </View>

      {selectedPoint && isMeasured && (
        <View
          style={{
            position: 'absolute',
            left: yAxisWidth + selectedPoint.x - 96,
            top: selectedPoint.y - 24,
            width: 200,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: theme.subAlt,
              paddingHorizontal: 4,
              paddingVertical: 2,
              borderRadius: 4,
            }}
          >
            <WlbText size={12}>
              {valueFormatter(selectedPoint.value)},{' '}
              {formatDateLabel(selectedPoint.date, true)}
            </WlbText>
          </View>
        </View>
      )}

      {isMeasured &&
        tickerPoints.map((point, i) => (
          <View
            key={i}
            style={{
              position: 'absolute',
              left: yAxisWidth + point.x - 26,
              bottom: -8,
              width: 60,
              alignItems: 'center',
            }}
          >
            <WlbText size={12}>{formatDateLabel(point.date)}</WlbText>
          </View>
        ))}
    </View>
  );
};

export default LineGraph;
