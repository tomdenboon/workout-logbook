import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useModalOutletContext } from 'src/components/ModalOutlet';
import { useDeleteWorkoutMutation } from 'src/store/monkeylogApi';

function DeleteWorkoutModal() {
  const [deleteWorkout] = useDeleteWorkoutMutation();
  const { workoutId } = useParams();
  const { modalControls } = useModalOutletContext();

  return workoutId ? (
    <Dialog {...modalControls}>
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
                modalControls.onClose();
              });
          }}
        >
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  ) : null;
}

export default DeleteWorkoutModal;
