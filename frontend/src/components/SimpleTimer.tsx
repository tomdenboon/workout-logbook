import { Typography } from '@mui/material';
import useTimer from 'hooks/useTimer';

function SimpleTimer(props: { startDate?: string; endDate?: string }) {
  const { startDate, endDate } = props;
  const { digitalTimerFormat } = useTimer(startDate, endDate);

  return <Typography>Time: {digitalTimerFormat}</Typography>;
}

export default SimpleTimer;
