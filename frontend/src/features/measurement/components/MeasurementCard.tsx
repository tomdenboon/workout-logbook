import { Add } from '@mui/icons-material';
import { Button, Stack, useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import ActionDropdown from 'components/ActionDropdown';
import AppCard from 'components/AppCard';
import { MeasurementFullResponse } from 'store/monkeylogApi';

interface MeasurementCardProps {
  measurement: MeasurementFullResponse;
  openAddMeasurementPointModal: () => void;
}

function MeasurementCard(props: MeasurementCardProps) {
  const { measurement, openAddMeasurementPointModal } = props;

  const theme = useTheme();

  const xAxis = measurement.measurementPoints.map(
    (measurmentPoint) => new Date(measurmentPoint.createdAt)
  );
  const seriesData = measurement.measurementPoints.map((measurmentPoint) => measurmentPoint.value);

  return (
    <AppCard
      header={measurement.name}
      actions={
        <Stack direction="row" spacing={1}>
          <Button
            color="primary"
            variant="outlined"
            onClick={openAddMeasurementPointModal}
            sx={{ height: 24, px: 1, py: 0, minWidth: 0 }}
          >
            <Add />
          </Button>
          <ActionDropdown actions={[{ action: () => null, label: 'Graph action' }]} />
        </Stack>
      }
    >
      {xAxis.length >= 1 && (
        <LineChart
          xAxis={[
            {
              min: xAxis[0].getTime(),
              max: xAxis[xAxis.length - 1].getTime(),
              data: xAxis,
              tickSpacing: 80,
              scaleType: 'time',
            },
          ]}
          series={[
            {
              color: theme.palette.primary.main,
              data: seriesData,
            },
          ]}
          margin={{ left: 30, top: 10, right: 10, bottom: 20 }}
          height={120}
        />
      )}
    </AppCard>
  );
}
export default MeasurementCard;
