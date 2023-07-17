import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStartWorkoutMutation } from '../../../../api/monkeylogApi';
import { Workout } from '../../../../types/Workout';
import WorkoutActions from './WorkoutActions';

interface WorkoutCardProps {
  workout: Workout;
}

function WorkoutCard(props: WorkoutCardProps) {
  const { workout } = props;
  const navigate = useNavigate();
  const [startWorkout, { data }] = useStartWorkoutMutation();

  useEffect(() => {
    if (data) {
      navigate(`/training/workouts/${data.id}`);
    }
  }, [data]);

  return (
    <Card variant="outlined">
      <CardHeader
        action={<WorkoutActions workout={workout} />}
        title={<Typography>{workout.name}</Typography>}
      />
      {workout.exerciseGroups.length > 0 && (
        <CardContent sx={{ pt: 0 }}>
          {workout.exerciseGroups.map((exerciseGroup) => (
            <Typography key={exerciseGroup.id} color="text.secondary">
              {exerciseGroup.exerciseRows.length} x {exerciseGroup.exercise.name}
            </Typography>
          ))}
        </CardContent>
      )}
      <CardActions sx={{ pt: 0 }}>
        <Button variant="contained" size="small" onClick={() => startWorkout(workout.id)}>
          START
        </Button>
      </CardActions>
    </Card>
  );
}

export default WorkoutCard;
