import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  DialogContent,
} from '@mui/material';
import WorkoutContext from 'features/workout/context/WorkoutContext';
import { IUseModal } from 'hooks/useModal';
import { useContext } from 'react';
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
  const { setWorkoutId } = useContext(WorkoutContext);
  const [startWorkout] = useStartWorkoutMutation();
  const [startEmptyWorkout] = useStartEmptyWorkoutMutation();

  const startTheWorkout = (id?: number) =>
    (id ? startWorkout({ id }) : startEmptyWorkout()).unwrap().then(({ id: finalId }) => {
      setWorkoutId(finalId);
      close();
    });

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
