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
  valueFormatter?: (value: number) => string;
}

const LineGraph = ({
  data = [],
  containerHeight = 180,
  period,
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

  const filteredData = useMemo(() => {
    const now = Date.now();
    let cutoffDate: number;

    switch (period) {
      case '3months':
        cutoffDate = now - 3 * 30 * 24 * 60 * 60 * 1000; // 3 months ago
        break;
      case '1year':
        cutoffDate = now - 365 * 24 * 60 * 60 * 1000; // 1 year ago
        break;
      default:
        return data;
    }

    return data.filter((item) => item.date >= cutoffDate);
  }, [data, period]);

  const { minValue, maxValue } = useMemo(() => {
    let max = Math.max(...filteredData.map((item) => item.value));

    max = Math.ceil(max / 10) * 10;

    return {
      minValue: 0,
      maxValue: max,
    };
  }, [filteredData]);

  const barWidth = width / filteredData.length;
  const points = useMemo(() => {
    const getX = (index: number) => {
      return index * barWidth;
    };

    const getY = (value: number) =>
      ((value - minValue) / (maxValue - minValue)) * height;

    return filteredData.map((p, i) => ({
      x: getX(i),
      y: getY(p.value),
      date: p.date,
      value: p.value,
    }));
  }, [filteredData, width, height, minValue, maxValue]);

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

    const barIndex = Math.floor(touchX / barWidth);
    const clampedIndex = Math.max(0, Math.min(barIndex, points.length - 1));
    return points[clampedIndex];
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
        paddingBottom: 16,
        height: containerHeight,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingRight: 4,
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
              borderBottomWidth: 2,
              borderBottomColor: theme.subAlt,
              borderTopWidth: 2,
              borderTopColor: theme.subAlt,
            }}
            onLayout={handleChartLayout}
          >
            {isMeasured ? (
              <Canvas
                style={{
                  flex: 1,
                }}
              >
                {points.map((p) => (
                  <Rect
                    key={p.x}
                    x={p.x + barWidth / 8}
                    y={height}
                    width={barWidth - barWidth / 4}
                    height={-p.y}
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
            left: yAxisWidth + selectedPoint.x - 100,
            bottom: selectedPoint.y + 20,
            width: 200 + barWidth,
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
            <WlbText size={12}>{valueFormatter(selectedPoint.value)}</WlbText>
            <WlbText size={12}>
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
              left: yAxisWidth + point.x - 100,
              bottom: 0,
              width: 200 + barWidth,
              alignItems: 'center',
            }}
          >
            <WlbText size={12}>
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
