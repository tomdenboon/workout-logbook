import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { IUseModal } from 'hooks/useModal';
import { useState } from 'react';
import { WorkoutCreateRequest, useCreateWorkoutMutation } from 'store/monkeylogApi';

function AddWorkoutModal(props: IUseModal) {
  const { isOpen, close } = props;
  const [workoutForm, setWorkoutForm] = useState<WorkoutCreateRequest>({
    name: '',
  });
  const [addWorkout] = useCreateWorkoutMutation();

  return (
    <Dialog open={isOpen} onClose={() => close()}>
      <DialogTitle>Add workout</DialogTitle>
      <DialogContent>
        <TextField
          label="Workout"
          size="small"
          margin="dense"
          value={workoutForm.name}
          onChange={(e) => setWorkoutForm({ ...workoutForm, name: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => close()}>Cancel</Button>
        <Button
          onClick={() =>
            addWorkout({ workoutCreateRequest: workoutForm })
              .unwrap()
              .then(() => close())
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddWorkoutModal;
