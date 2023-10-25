import { ContentCopy, Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ActionDropdown from 'src/components/ActionDropdown';
import {
  WorkoutResponse,
  useDeleteWorkoutMutation,
  useDuplicateWorkoutMutation,
} from 'src/store/monkeylogApi';

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
          action: () => navigate('workouts/' + workout.id.toString()),
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
