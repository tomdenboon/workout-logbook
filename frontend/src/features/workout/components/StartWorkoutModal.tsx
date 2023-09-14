import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
  DialogContent,
} from '@mui/material';
import useModal, { IUseModal, ModalType } from 'src/hooks/useModal';
import {
  WorkoutFullResponse,
  useStartEmptyWorkoutMutation,
  useStartWorkoutMutation,
} from 'src/store/monkeylogApi';

function StartWorkoutModal(
  props: {
    workout?: WorkoutFullResponse;
  } & IUseModal,
) {
  const { workout, isOpen, close } = props;
  const { open: setWorkoutId } = useModal(ModalType.Workout);
  const [startWorkout] = useStartWorkoutMutation();
  const [startEmptyWorkout] = useStartEmptyWorkoutMutation();

  const startTheWorkout = (id?: string) =>
    (id ? startWorkout({ id }) : startEmptyWorkout())
      .unwrap()
      .then(({ id: finalId }) => {
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
