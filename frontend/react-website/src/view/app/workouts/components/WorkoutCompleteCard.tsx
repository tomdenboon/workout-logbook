import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Workout } from '../../../../types/Workout';
import useTimer from '../../hooks/useTimer';
import WorkoutActions from './WorkoutActions';

interface WorkoutCompleteCardProps {
  workout: Workout;
}

function WorkoutCompleteCard(props: WorkoutCompleteCardProps) {
  const { workout } = props;
  const { prettyTimerFormat } = useTimer(workout.startDate, workout.endDate);

  return (
    <Card variant="outlined" sx={{ padding: 1 }}>
      <CardHeader
        title={<Typography>{workout.name}</Typography>}
        subheader={`${new Date(workout.startDate).toLocaleDateString()} ${prettyTimerFormat}`}
        action={<WorkoutActions workout={workout} />}
      />
      {workout.exerciseGroups.length > 0 && (
        <CardContent>
          {workout.exerciseGroups.map((exerciseGroup) => (
            <div key={exerciseGroup.id}>
              {exerciseGroup.exerciseRows.length} x {exerciseGroup.exercise.name}
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
}

export default WorkoutCompleteCard;
