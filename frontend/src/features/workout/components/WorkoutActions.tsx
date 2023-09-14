import { ContentCopy, Delete, Edit } from '@mui/icons-material';
import ActionDropdown from 'src/components/ActionDropdown';
import useModal, { ModalType } from 'src/hooks/useModal';
import {
  WorkoutResponse,
  useDeleteWorkoutMutation,
  useDuplicateWorkoutMutation,
} from 'src/store/monkeylogApi';

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
