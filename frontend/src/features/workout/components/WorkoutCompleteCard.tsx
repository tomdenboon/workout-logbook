import AppCard from 'src/components/AppCard';
import WorkoutActions from 'src/features/workout/components/WorkoutActions';
import useTimer from 'src/hooks/useTimer';
import { WorkoutFullResponse } from 'src/store/monkeylogApi';

interface WorkoutCompleteCardProps {
  workout: WorkoutFullResponse;
}

function WorkoutCompleteCard(props: WorkoutCompleteCardProps) {
  const { workout } = props;
  const { prettyTimerFormat } = useTimer(workout.startDate, workout.endDate);

  return (
    <AppCard
      header={workout.name}
      subheader={`${new Date(
        workout?.startDate ?? '',
      ).toLocaleDateString()} ${prettyTimerFormat}`}
      actions={<WorkoutActions workout={workout} />}
    >
      {workout.exerciseGroups.length > 0 &&
        workout.exerciseGroups.map((exerciseGroup) => (
          <div key={exerciseGroup.id}>
            {exerciseGroup.exerciseRows?.length ?? 0} x{' '}
            {exerciseGroup.exercise.name}
          </div>
        ))}
    </AppCard>
  );
}

export default WorkoutCompleteCard;
