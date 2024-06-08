import { Typography } from '@mui/material';
import { formatTime, useWorkoutTimer } from 'src/hooks/useTimer';

function SimpleTimer(props: { startDate?: string; endDate?: string }) {
  const { startDate, endDate } = props;
  const milliseconds = useWorkoutTimer(startDate, endDate);

  return <Typography>Time: {formatTime(milliseconds, 'digital')}</Typography>;
}

export default SimpleTimer;
