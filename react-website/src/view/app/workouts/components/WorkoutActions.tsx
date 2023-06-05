import { useNavigate } from 'react-router-dom';
import { useCloneWorkoutMutation, useDeleteWorkoutMutation } from '../../../../api/monkeylogApi';
import ActionDropdown from '../../../../components/ActionDropdown';
import { Workout } from '../../../../types/Workout';

function WorkoutActions(props: { workout: Workout }) {
  const { workout } = props;
  const navigate = useNavigate();
  const [cloneWorkout] = useCloneWorkoutMutation();
  const [deleteWorkout] = useDeleteWorkoutMutation();

  return (
    <ActionDropdown
      actions={[
        { label: 'Edit', action: () => navigate(`/app/workouts/${workout.id}`) },
        { label: 'Clone', action: () => cloneWorkout(workout.id) },
        {
          label: 'Delete',
          action: () => {
            deleteWorkout(workout.id);
          },
        },
      ]}
    />
  );
}

export default WorkoutActions;
