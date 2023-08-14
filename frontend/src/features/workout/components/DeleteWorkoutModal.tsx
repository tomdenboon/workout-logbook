import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { IUseModal } from 'hooks/useModal';
import { useDeleteWorkoutMutation } from 'store/monkeylogApi';

function DeleteWorkoutModal(
  props: {
    workoutId: number;
    closeWorkoutModal: () => void;
  } & IUseModal
) {
  const { workoutId, closeWorkoutModal, isOpen, close } = props;
  const [deleteWorkout] = useDeleteWorkoutMutation();

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Cancel workout</DialogTitle>
      <DialogContent>
        Are you sure you want to cancel this workout? Get logged exercises will be lost.
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
