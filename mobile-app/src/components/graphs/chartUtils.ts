export interface ChartDataPoint {
  date: number;
  value: number;
}

export const calculateMinMaxValues = (
  data: ChartDataPoint[],
  fromZero = false,
) => {
  if (data.length === 0) {
    return { minValue: 0, maxValue: 10 };
  }

  let min = Math.min(...data.map((item) => item.value));
  let max = Math.max(...data.map((item) => item.value));

  min = Math.floor(min / 10) * 10;
  max = Math.ceil(max / 10) * 10;

  if (fromZero) {
    min = 0;
  }

  return { minValue: min, maxValue: max };
};

export const generateTickerPoints = <T extends { x: number }>(
  points: T[],
  width: number,
): T[] => {
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
};

export const formatDateLabel = (date: number, includeYear = false) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(includeYear && { year: 'numeric' }),
  });
};
