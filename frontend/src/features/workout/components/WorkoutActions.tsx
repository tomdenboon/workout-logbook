import { useNavigate } from 'react-router-dom';
import { ContentCopy, Delete, Edit } from '@mui/icons-material';
import ActionDropdown from 'components/ActionDropdown';
import { useCloneWorkoutMutation, useDeleteWorkoutMutation } from 'services/monkeylogApi';
import { WorkoutSmall } from 'features/workout/types';

function WorkoutActions(props: { workout: WorkoutSmall }) {
  const { workout } = props;
  const navigate = useNavigate();
  const [cloneWorkout] = useCloneWorkoutMutation();
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
          action: () => cloneWorkout(workout.id),
          icon: <ContentCopy />,
        },
        {
          label: 'Delete',
          action: () => {
            deleteWorkout(workout.id);
          },
          icon: <Delete />,
        },
      ]}
    />
  );
}

export default WorkoutActions;
