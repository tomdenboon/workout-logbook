import { ContentCopy, Delete, Edit } from '@mui/icons-material';
import ActionDropdown from 'components/ActionDropdown';
import {
  WorkoutResponse,
  useDeleteWorkoutMutation,
  useDuplicateWorkoutMutation,
} from 'store/monkeylogApi';
import WorkoutContext from 'features/workout/context/WorkoutContext';
import { useContext } from 'react';

function WorkoutActions(props: { workout: WorkoutResponse }) {
  const { workout } = props;
  const { setWorkoutId } = useContext(WorkoutContext);
  const [cloneWorkout] = useDuplicateWorkoutMutation();
  const [deleteWorkout] = useDeleteWorkoutMutation();

  return (
    <ActionDropdown
      actions={[
        {
          label: 'Edit',
          action: () => setWorkoutId(workout.id),
          icon: <Edit />,
        },
        {
          label: 'Duplicate',
          action: () => cloneWorkout({ id: workout.id }),
          icon: <ContentCopy />,
        },
        {
          label: 'Delete',
          action: () => {
            deleteWorkout({ id: workout.id });
          },
          icon: <Delete />,
        },
      ]}
    />
  );
}

export default WorkoutActions;
