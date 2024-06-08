import { Button, Typography } from '@mui/material';
import AppCard from 'src/components/AppCard';
import WorkoutActions from 'src/features/workout/components/WorkoutActions';
import { useMemo } from 'react';
import { WorkoutFullResponse } from 'src/store/workoutLogbookApi';

interface WorkoutCardProps {
  workout: WorkoutFullResponse;
  onClick: () => void;
}

function WorkoutCard(props: WorkoutCardProps) {
  const { workout, onClick } = props;

  const allExercisesText = useMemo(
    () =>
      workout?.exerciseGroups
        .map(
          (exerciseGroup) => `${exerciseGroup.exerciseRows.length} x ${exerciseGroup.exercise.name}`
        )
        .join(', ') ?? null,
    [workout?.exerciseGroups]
  );

  return (
    <AppCard header={workout.name} actions={<WorkoutActions workout={workout} />}>
      {allExercisesText && <Typography color="text.secondary">{allExercisesText}</Typography>}
      <Button
        component="a"
        size="small"
        variant="contained"
        sx={{ height: 24, px: 1, py: 0, minWidth: 0, mt: 1 }}
        onClick={onClick}
      >
        Start workout
      </Button>
    </AppCard>
  );
}

export default WorkoutCard;
