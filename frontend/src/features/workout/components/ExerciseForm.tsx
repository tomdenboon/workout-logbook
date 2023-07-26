import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import {
  ExerciseResponse,
  useGetExerciseTypesQuery,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
} from 'store/monkeylogApi';

interface ExerciseFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  exercise?: ExerciseResponse;
}

function ExerciseForm(props: ExerciseFormProps) {
  const { isOpen, setIsOpen, exercise } = props;

  const [addExercise] = useCreateExerciseMutation();
  const [updateExercise] = useUpdateExerciseMutation();
  const { data: exerciseTypes } = useGetExerciseTypesQuery();
  const [name, setName] = useState('');
  const [exerciseType, setExerciseType] = useState<number>();

  useEffect(() => {
    if (exercise) {
      setName(exercise.name);
      setExerciseType(exercise.exerciseType.id);
    }
  }, [exercise]);

  const submitForm = useCallback(() => {
    if (!exerciseType) {
      return;
    }

    if (exercise) {
      updateExercise({ id: exercise.id, exerciseUpdateRequest: { name } });
    } else {
      addExercise({ exerciseCreateRequest: { name, exerciseTypeId: exerciseType } });
    }

    setIsOpen(false);
  }, [exercise, exerciseType, name]);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>{exercise ? 'Edit Exercise' : 'Create Exercise'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            size="small"
            margin="dense"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormControl size="small" disabled={!!exercise}>
            <InputLabel id="exercise_type_label">Type</InputLabel>
            <Select
              label="Type"
              labelId="exercise_type_label"
              value={exerciseType ?? ''}
              onChange={(e) => setExerciseType(e.target.value as number)}
            >
              {exerciseTypes?.map((et) => (
                <MenuItem key={et.id} value={et.id}>
                  {et.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={() => setIsOpen(false)}>
          cancel
        </Button>
        <Button variant="text" onClick={submitForm}>
          save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ExerciseForm;
