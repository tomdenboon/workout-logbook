import { Button, Typography } from '@mui/material';
import AppCard from 'components/AppCard';
import WorkoutActions from 'features/workout/components/WorkoutActions';
import { WorkoutFullResponse } from 'store/monkeylogApi';

interface WorkoutCardProps {
  workout: WorkoutFullResponse;
  onClick: () => void;
}

function WorkoutCard(props: WorkoutCardProps) {
  const { workout, onClick } = props;

  return (
    <AppCard header={workout.name} actions={<WorkoutActions workout={workout} />}>
      {workout.exerciseGroups.length > 0 &&
        workout.exerciseGroups.map((exerciseGroup) => (
          <Typography key={exerciseGroup.id} color="text.secondary">
            {exerciseGroup.exerciseRows.length} x {exerciseGroup.exercise.name}
          </Typography>
        ))}
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
