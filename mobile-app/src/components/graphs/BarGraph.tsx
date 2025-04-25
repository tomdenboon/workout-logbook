import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View } from 'react-native';
import { useTheme } from 'context/theme';
import {
  Canvas,
  Line,
  vec,
  Points,
  Circle,
  Rect,
} from '@shopify/react-native-skia';
import WlbText from 'components/WlbText';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import useMeasureLayout from 'components/graphs/useMeasureLayout';

interface LineGraphI {
  data: {
    date: number;
    value: number;
  }[];
  containerHeight?: number;
  period?: '3months' | '1year' | '';
}

const LineGraph = ({ data = [], containerHeight = 180 }: LineGraphI) => {
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
    let max = Math.max(...data.map((item) => item.value));

    max = Math.ceil(max / 10) * 10;

    return {
      minValue: 0,
      maxValue: max,
    };
  }, [data]);

  const barWidth = (width - 8) / data.length;
  const points = useMemo(() => {
    const getX = (index: number) => {
      return 4 + index * barWidth;
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
    if (width === 0 || points.length === 0) return [];
    if (points.length === 1) return points;
    const minLabelSpacing = 70;
    const maxLabels = Math.max(2, Math.floor(width / minLabelSpacing));
    if (points.length <= maxLabels) return points;

    const result = [];
    const step = (points.length - 1) / (maxLabels - 1);

    for (let i = 0; i < maxLabels; i++) {
      const index = Math.round(i * step);
      result.push(points[index]);
    }

    return result;
  }, [points, width]);

  const findClosestPoint = (touchX: number) => {
    'worklet';
    if (points.length === 0) return null;

    let closest = points[0];
    let minDistance = Math.abs(touchX - closest.x);

    for (let i = 1; i < points.length; i++) {
      const distance = Math.abs(touchX - points[i].x);
      if (distance < minDistance) {
        minDistance = distance;
        closest = points[i];
      }
    }

    return closest;
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
        flex: 1,
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
          <WlbText>{maxValue}</WlbText>
          <WlbText>{minValue}</WlbText>
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

                {points.map((p) => (
                  <Rect
                    key={p.x}
                    x={p.x + barWidth / 8}
                    y={p.y}
                    width={barWidth - barWidth / 4}
                    height={height - p.y - 4}
                    color={theme.main}
                  />
                ))}
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
            left: yAxisWidth + selectedPoint.x - 96 + barWidth / 2,
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
            <WlbText size={14}>
              {selectedPoint.value.toFixed(1)},{' '}
              {new Date(selectedPoint.date).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
                day: 'numeric',
              })}
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
              width: 60 + barWidth,
              alignItems: 'center',
            }}
          >
            <WlbText size={14}>
              {new Date(point.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </WlbText>
          </View>
        ))}
    </View>
  );
};

export default LineGraph;
