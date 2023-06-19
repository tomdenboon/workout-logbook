export type MeasurementSlim = {
  id: number;
  name: string;
  unit: string;
};

export type Measurement = MeasurementSlim & {
  measurementPoints: Array<MeasurementPoint>;
};

export type MeasurementPost = {
  name: string;
  unit: string;
};

export type MeasurementPut = {
  id: number;
  name: string;
  unit: string;
};

export type MeasurementPoint = {
  id: number;
  value: number;
  createdAt: string;
};

export type MeasurementPointPost = {
  value: number;
};
