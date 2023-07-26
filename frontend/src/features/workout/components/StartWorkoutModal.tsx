import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  DialogContent,
} from '@mui/material';
import { IUseModal } from 'hooks/useModal';
import { useNavigate } from 'react-router-dom';
import {
  WorkoutFullResponse,
  useStartEmptyWorkoutMutation,
  useStartWorkoutMutation,
} from 'store/monkeylogApi';

function StartWorkoutModal(
  props: {
    workout?: WorkoutFullResponse;
  } & IUseModal
) {
  const { workout, isOpen, close } = props;
  const navigate = useNavigate();
  const [startWorkout] = useStartWorkoutMutation();
  const [startEmptyWorkout] = useStartEmptyWorkoutMutation();

  const startTheWorkout = (id?: number) =>
    (id ? startWorkout({ id }) : startEmptyWorkout())
      .unwrap()
      .then(({ id: finalId }) => navigate(`/training/workouts/${finalId}`));

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Start workout</DialogTitle>
      <DialogContent>
        {workout?.exerciseGroups.map((exerciseGroup) => (
          <Typography key={exerciseGroup.id} color="text.secondary">
            {exerciseGroup.exerciseRows.length} x {exerciseGroup.exercise.name}
          </Typography>
        ))}
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={() => startTheWorkout(workout?.id)}>
          Start workout
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StartWorkoutModal;
