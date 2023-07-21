import { Card, CardActionArea, CardContent, CardHeader, Typography } from '@mui/material';
import WorkoutActions from 'features/workout/components/WorkoutActions';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStartWorkoutMutation } from 'services/monkeylogApi';
import { Workout } from 'features/workout/types';

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
      <CardActionArea component="a" onClick={() => startWorkout(workout.id)}>
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
      </CardActionArea>
    </Card>
  );
}

export default WorkoutCard;
