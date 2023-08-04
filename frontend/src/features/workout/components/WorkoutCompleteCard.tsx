import AppCard from 'components/AppCard';
import WorkoutActions from 'features/workout/components/WorkoutActions';
import useTimer from 'hooks/useTimer';
import { WorkoutFullResponse } from 'store/monkeylogApi';

interface WorkoutCompleteCardProps {
  workout: WorkoutFullResponse;
}

function WorkoutCompleteCard(props: WorkoutCompleteCardProps) {
  const { workout } = props;
  const { prettyTimerFormat } = useTimer(workout.startDate, workout.endDate);

  return (
    <AppCard
      header={workout.name}
      subheader={`${new Date(workout?.startDate ?? '').toLocaleDateString()} ${prettyTimerFormat}`}
      actions={<WorkoutActions workout={workout} />}
    >
      {workout.exerciseGroups.length > 0 &&
        workout.exerciseGroups.map((exerciseGroup) => (
          <div key={exerciseGroup.id}>
            {exerciseGroup.exerciseRows.length} x {exerciseGroup.exercise.name}
          </div>
        ))}
    </AppCard>
  );
}

export default WorkoutCompleteCard;
