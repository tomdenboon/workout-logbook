import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Grid,
  IconButton,
} from '@mui/material';
import { useMemo, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  useAddMeasurementMutation,
  useAddMeasurementPointMutation,
  useGetMeasurementsQuery,
} from '../../../api/measurementApi';
import Section from '../../../components/Section';
import base from '../../../themes/base';
import { Measurement } from '../../../types/Measurement';
import AppGridContainer from '../components/AppGridContainer';
import Header from '../components/AppHeader';

interface MeasurementCardProps {
  measurement: Measurement;
}

function MeasurementCard(props: MeasurementCardProps) {
  const { measurement } = props;

  const [addMeasurementPoint] = useAddMeasurementPointMutation();
  const [value, setValue] = useState('');

  const chartData = useMemo(
    () =>
      measurement.measurementPoints.map((measurementPoint) => ({
        x: new Date(measurementPoint.createdAt).getTime(),
        y: measurementPoint.value,
      })),
    [measurement]
  );

  return (
    <div>
      <div className="flex w-full justify-between gap-px">
        <div className="w-full rounded bg-surface p-2">{measurement.name}</div>

        <div className="flex items-center gap-1  bg-surface p-2">
          <input
            className="mr-2 w-12 bg-surface p-1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          {measurement.unit}
          <Fab
            onClick={() =>
              addMeasurementPoint({ id: measurement.id, body: { value: parseInt(value, 10) } })
            }
          >
            <FiPlus />
          </Fab>
        </div>
      </div>
      <div>
        <div className="rounded bg-surface p-2">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <Tooltip />
              <XAxis
                tickLine={false}
                axisLine={false}
                dataKey="x"
                type="number"
                domain={[
                  Math.min(...chartData.map((o) => o.x)),
                  Math.max(...chartData.map((o) => o.x)),
                ]}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[
                  Math.min(...chartData.map((o) => o.y)),
                  Math.max(...chartData.map((o) => o.y)),
                ]}
                ticks={[
                  Math.min(...chartData.map((o) => o.y)),
                  Math.max(...chartData.map((o) => o.y)),
                ]}
              />
              <Line type="monotone" dataKey="y" connectNulls stroke={base.primary} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function Statistics() {
  const { data } = useGetMeasurementsQuery();
  const [addMeasurement] = useAddMeasurementMutation();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppGridContainer
      header={
        <Header
          RightButton={
            <IconButton onClick={() => setIsOpen(true)} color="inherit">
              <FiPlus />
            </IconButton>
          }
          title="Statistics"
        />
      }
    >
      <Section title="General Statistics" />
      <Section title="Measurements">
        <Grid container>
          {data?.map((measurement) => (
            <Grid item>
              <MeasurementCard key={measurement.id} measurement={measurement} />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Add measurement</DialogTitle>
        <DialogContent>Test</DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={() => addMeasurement({ name: 'measurement', unit: 'KG' })}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </AppGridContainer>
  );
}

export default Statistics;
