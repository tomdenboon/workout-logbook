import { useNavigate } from 'react-router-dom';
import { ContentCopy, Delete, Edit } from '@mui/icons-material';
import ActionDropdown from 'components/ActionDropdown';
import {
  WorkoutResponse,
  useDeleteWorkoutMutation,
  useDuplicateWorkoutMutation,
} from 'store/monkeylogApi';

function WorkoutActions(props: { workout: WorkoutResponse }) {
  const { workout } = props;
  const navigate = useNavigate();
  const [cloneWorkout] = useDuplicateWorkoutMutation();
  const [deleteWorkout] = useDeleteWorkoutMutation();

  return (
    <ActionDropdown
      actions={[
        {
          label: 'Edit',
          action: () => navigate(`/training/workouts/${workout.id}`),
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
