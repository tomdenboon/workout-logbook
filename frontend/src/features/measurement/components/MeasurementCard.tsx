import { Add } from '@mui/icons-material';
import {
  Button,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { Measurement } from 'features/measurement/types';
import { useState } from 'react';
import { useAddMeasurementPointMutation } from 'services/measurementApi';

interface MeasurementCardProps {
  measurement: Measurement;
}

function MeasurementCard(props: MeasurementCardProps) {
  const { measurement } = props;

  const [addMeasurementPoint] = useAddMeasurementPointMutation();
  const theme = useTheme();
  const [value, setValue] = useState('');

  const xAxis = measurement.measurementPoints.map(
    (measurmentPoint) => new Date(measurmentPoint.createdAt)
  );
  const seriesData = measurement.measurementPoints.map((measurmentPoint) => measurmentPoint.value);

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>{measurement.name}</Typography>
          <TextField
            value={value}
            size="small"
            onChange={(e) => setValue(e.target.value)}
            inputProps={{
              endAdornment: <InputAdornment position="end">{measurement.unit}</InputAdornment>,
            }}
          />
          <Button
            variant="outlined"
            onClick={() =>
              addMeasurementPoint({ id: measurement.id, body: { value: parseInt(value, 10) } })
            }
          >
            <Add />
          </Button>
        </Stack>
        {xAxis.length >= 1 && (
          <LineChart
            xAxis={[
              {
                min: xAxis[0].getTime(),
                max: xAxis[xAxis.length - 1].getTime(),
                data: xAxis,
                tickSpacing: 80,
                scaleType: 'time',
                disableLine: true,
                disableTicks: true,
              },
            ]}
            series={[
              {
                color: theme.palette.primary.main,
                data: seriesData,
              },
            ]}
            margin={{ left: 30, top: 10, right: 10, bottom: 20 }}
            width={500}
            height={120}
          />
        )}
      </Stack>
    </Paper>
  );
}
export default MeasurementCard;
