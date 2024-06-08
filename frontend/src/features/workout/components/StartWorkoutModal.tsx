import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  DialogContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useModalOutletContext } from 'src/components/ModalOutlet';
import {
  WorkoutFullResponse,
  useStartEmptyWorkoutMutation,
  useStartWorkoutMutation,
} from 'src/store/workoutLogbookApi';

function StartWorkoutModal() {
  const { workout, modalControls } = useModalOutletContext<{ workout?: WorkoutFullResponse }>();
  const navigate = useNavigate();
  const [startWorkout] = useStartWorkoutMutation();
  const [startEmptyWorkout] = useStartEmptyWorkoutMutation();

  const startTheWorkout = (id?: string) =>
    (id ? startWorkout({ id }) : startEmptyWorkout())
      .unwrap()
      .then(({ id: finalId }) => navigate('../workouts/' + finalId));

  return (
    <Dialog {...modalControls}>
      <DialogTitle>Start {workout?.name ?? 'workout'}</DialogTitle>
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
