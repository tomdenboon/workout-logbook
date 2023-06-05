import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { useAddWorkoutMutation } from '../../../../api/monkeylogApi';

interface AddWorkoutModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface AddExerciseForm {
  name: string;
}

function AddWorkoutModal(props: AddWorkoutModalProps) {
  const { isOpen, setIsOpen } = props;
  const [workoutForm, setWorkoutForm] = useState<AddExerciseForm>({
    name: '',
  });
  const [addWorkout] = useAddWorkoutMutation();

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
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
        <Button onClick={() => setIsOpen(false)}>Cancel</Button>
        <Button
          onClick={() => {
            addWorkout(workoutForm);
            setIsOpen(false);
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddWorkoutModal;
