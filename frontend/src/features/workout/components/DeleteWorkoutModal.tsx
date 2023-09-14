import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { IUseModal } from 'src/hooks/useModal';
import { useDeleteWorkoutMutation } from 'src/store/monkeylogApi';

function DeleteWorkoutModal(
  props: {
    workoutId: string;
    closeWorkoutModal: () => void;
  } & IUseModal,
) {
  const { workoutId, closeWorkoutModal, isOpen, close } = props;
  const [deleteWorkout] = useDeleteWorkoutMutation();

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Cancel workout</DialogTitle>
      <DialogContent>
        Are you sure you want to cancel this workout? Get logged exercises will
        be lost.
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={() => {
            deleteWorkout({ id: workoutId })
              .unwrap()
              .then(() => {
                close();
                closeWorkoutModal();
              });
          }}
        >
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteWorkoutModal;
