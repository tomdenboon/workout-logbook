import { Typography } from '@mui/material';
import AppCard from 'src/components/AppCard';
import WorkoutActions from 'src/features/workout/components/WorkoutActions';
import { WorkoutFullResponse } from 'src/store/workoutLogbookApi';

interface WorkoutCardProps {
  workout: WorkoutFullResponse;
  onClick: () => void;
}

function WorkoutCard(props: WorkoutCardProps) {
  const { workout, onClick } = props;

  return (
    <AppCard header={workout.name} actions={<WorkoutActions workout={workout} />} onClick={onClick}>
      <Typography color="text.secondary" fontSize={14}>
        {workout?.exerciseGroups
          .map((exerciseGroup) => `${exerciseGroup.exercise.name}`)
          .join(', ')}
      </Typography>
    </AppCard>
  );
}

export default WorkoutCard;
