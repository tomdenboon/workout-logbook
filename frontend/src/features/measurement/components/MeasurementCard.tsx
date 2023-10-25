import { Add } from '@mui/icons-material';
import { Button, Stack, useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import ActionDropdown from 'src/components/ActionDropdown';
import AppCard from 'src/components/AppCard';
import { METRIC_FORMAT_NICE } from 'src/features/measurement/types';
import { MeasurementFullResponse, useDeleteMeasurementMutation } from 'src/store/monkeylogApi';

interface MeasurementCardProps {
  measurement: MeasurementFullResponse;
}

function MeasurementCard(props: MeasurementCardProps) {
  const { measurement } = props;
  const [deleteMeasurement] = useDeleteMeasurementMutation();

  const theme = useTheme();
  const navigate = useNavigate();

  const xAxis = measurement.points.map((measurmentPoint) => new Date(measurmentPoint.createdAt));
  const seriesData = measurement.points.map((measurmentPoint) => measurmentPoint.value);

  return (
    <AppCard
      header={measurement.name}
      subheader={METRIC_FORMAT_NICE[measurement.metric]}
      actions={
        <Stack direction="row" spacing={1}>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => navigate(`${measurement.id}/point`)}
            sx={{ height: 24, px: 1, py: 0, minWidth: 0 }}
          >
            <Add />
          </Button>
          <ActionDropdown
            actions={[{ action: () => deleteMeasurement({ id: measurement.id }), label: 'Delete' }]}
          />
        </Stack>
      }
    >
      {xAxis.length >= 1 && (
        <LineChart
          xAxis={[
            {
              min: dayjs().subtract(3, 'month').toDate(),
              max: dayjs().toDate(),
              data: xAxis,
              scaleType: 'time',
              tickNumber: 3,
            },
          ]}
          series={[
            {
              color: theme.palette.primary.main,
              data: seriesData,
            },
          ]}
          margin={{ left: 30, top: 10, right: 10, bottom: 24 }}
          height={120}
        />
      )}
    </AppCard>
  );
}
export default MeasurementCard;
