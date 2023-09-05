import { ContentCopy, Delete, Edit } from '@mui/icons-material';
import ActionDropdown from 'components/ActionDropdown';
import useModal, { ModalType } from 'hooks/useModal';
import {
  WorkoutResponse,
  useDeleteWorkoutMutation,
  useDuplicateWorkoutMutation,
} from 'store/monkeylogApi';

function WorkoutActions(props: { workout: WorkoutResponse }) {
  const { workout } = props;
  const { open: setWorkoutId } = useModal(ModalType.Workout);
  const [cloneWorkout] = useDuplicateWorkoutMutation();
  const [deleteWorkout] = useDeleteWorkoutMutation();

  return (
    <ActionDropdown
      actions={[
        {
          label: 'Edit',
          action: () => setWorkoutId(workout.id.toString()),
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
