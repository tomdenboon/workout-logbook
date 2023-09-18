export const METRIC_FORMATS = ['WEIGHT', 'DISTANCE', 'TIME', 'NUMBER', 'PERCENTAGE'] as const;

export const METRIC_FORMAT_NICE: Record<MetricFormat, string> = {
  DISTANCE: 'Distance',
  WEIGHT: 'Weight',
  TIME: 'Time',
  NUMBER: 'Number',
  PERCENTAGE: 'Percentage',
};

export type MetricFormat = (typeof METRIC_FORMATS)[number];
