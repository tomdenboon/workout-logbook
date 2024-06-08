import { Timer, LineWeight } from '@mui/icons-material';
import { Paper, LinearProgress, Container, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTimer } from 'src/hooks/useTimer';

const useWorkoutTimer = () => {
  const [startTime, setStartTime] = useState(Date.now());
  const [milliseconds, setMilliseconds] = useState(0);
  const [isStopped, setIsStopped] = useState(true);
  const endTime = startTime + milliseconds;
  const timerMilliseconds = useTimer(startTime, isStopped ? endTime : undefined);
  const currTime = startTime + timerMilliseconds;

  useEffect(() => {
    if (currTime > endTime) {
      setIsStopped(true);
    }
  }, [currTime, endTime]);

  function start(milliseconds: number) {
    setStartTime(Date.now());
    setMilliseconds(milliseconds);
    setIsStopped(false);
  }

  function clear() {
    setStartTime(Date.now());
    setMilliseconds(0);
    setIsStopped(true);
  }

  return {
    start,
    clear,
    progress: milliseconds > 0 ? (timerMilliseconds / milliseconds) * 100 : undefined,
  };
};

function WorkoutFooterActions() {
  const { start, clear, progress } = useWorkoutTimer();

  console.log(progress);
  return (
    <Paper elevation={2}>
      {progress != undefined && (
        <LinearProgress
          color={progress == 100 ? 'success' : 'primary'}
          sx={{
            '& .MuiLinearProgress-bar': {
              transition: 'none',
            },
          }}
          variant="determinate"
          value={progress}
        />
      )}
      <Container maxWidth="lg" sx={{ display: 'flex', gap: 2, p: 2 }}>
        <Button
          fullWidth
          startIcon={<Timer />}
          variant="outlined"
          onClick={() => {
            progress == undefined ? start(10000) : clear();
          }}
        >
          Timer
        </Button>
        <Button fullWidth startIcon={<LineWeight />} variant="outlined">
          Plate calculator
        </Button>
      </Container>
    </Paper>
  );
}

export default WorkoutFooterActions;
