import {
  Measurement,
  MeasurementPoint,
  MeasurementPointPost,
  MeasurementPost,
} from '../types/Measurement';
import { monkeylogApi } from './monkeylogApi';

const measurementApi = monkeylogApi.injectEndpoints({
  endpoints: (builder) => ({
    getMeasurements: builder.query<Array<Measurement>, void>({
      query: () => `measurement`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Measurement' as const, id })),
              { type: 'Measurement', id: 'LIST' },
            ]
          : [{ type: 'Measurement', id: 'LIST' }],
    }),
    addMeasurement: builder.mutation<Measurement, MeasurementPost>({
      query: (body) => ({
        url: `measurement`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Measurement', id: 'LIST' }],
    }),
    addMeasurementPoint: builder.mutation<
      MeasurementPoint,
      { id: number; body: MeasurementPointPost }
    >({
      query: ({ id, body }) => ({
        url: `measurement/${id}/measurement_point`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, args) => [{ type: 'Measurement', id: args.id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeasurementsQuery,
  useAddMeasurementMutation,
  useAddMeasurementPointMutation,
} = measurementApi;
