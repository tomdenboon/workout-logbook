import { useTheme } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import ActionDropdown from 'components/ActionDropdown';
import AppCard from 'components/AppCard';
import { MeasurementFullResponse } from 'store/monkeylogApi';

interface MeasurementCardProps {
  measurement: MeasurementFullResponse;
}

function MeasurementCard(props: MeasurementCardProps) {
  const { measurement } = props;

  // const [addMeasurementPoint] = useCreateMeasurementPointMutation();
  // const [value, setValue] = useState('');
  const theme = useTheme();

  const xAxis = measurement.measurementPoints.map(
    (measurmentPoint) => new Date(measurmentPoint.createdAt)
  );
  const seriesData = measurement.measurementPoints.map((measurmentPoint) => measurmentPoint.value);

  return (
    <AppCard
      header={measurement.name}
      actions={<ActionDropdown actions={[{ action: () => null, label: 'Graph action' }]} />}
    >
      {/* <TextField
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
              addMeasurementPoint({
                id: measurement.id,
                measurementPointCreateRequest: { value: parseInt(value, 10) },
              })
            }
          >
            <Add />
          </Button> */}
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
          margin={{ left: 22, top: 10, right: 10, bottom: 20 }}
          height={120}
        />
      )}
    </AppCard>
  );
}
export default MeasurementCard;
