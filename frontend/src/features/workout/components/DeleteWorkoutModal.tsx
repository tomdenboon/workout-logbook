import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { IUseModal } from 'hooks/useModal';
import { useNavigate } from 'react-router-dom';
import { useDeleteWorkoutMutation } from 'store/monkeylogApi';

function DeleteWorkoutModal(
  props: {
    id: number;
  } & IUseModal
) {
  const { id, isOpen, close } = props;
  const [deleteWorkout] = useDeleteWorkoutMutation();
  const navigate = useNavigate();

  return (
    <Dialog open={isOpen} onClose={() => close}>
      <DialogTitle>Cancel workout</DialogTitle>
      <DialogContent>
        Are you sure you want to cancel this workout? Get logged exercises will be lost.
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          onClick={() => {
            deleteWorkout({ id })
              .unwrap()
              .then(() => navigate('/training'));
          }}
        >
          CONFIRM
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteWorkoutModal;
