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
import useForm from 'hooks/useForm';
import { useCallback, useEffect } from 'react';
import {
  ExerciseResponse,
  useGetExerciseTypesQuery,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
} from 'store/monkeylogApi';

interface ExerciseFormProps {
  isOpen: boolean;
  close: () => void;
  exercise?: ExerciseResponse;
}

function ExerciseForm(props: ExerciseFormProps) {
  const { isOpen, close, exercise } = props;

  const [addExercise] = useCreateExerciseMutation();
  const [updateExercise] = useUpdateExerciseMutation();
  const { data: exerciseTypes } = useGetExerciseTypesQuery();
  const {
    data: exerciseForm,
    update,
    init,
  } = useForm<{ name: string; exerciseType?: number }>({
    name: '',
  });

  useEffect(() => {
    if (exercise) {
      init({
        name: exercise.name,
        exerciseType: exercise.exerciseType.id,
      });
    }
  }, [exercise]);

  const submitForm = useCallback(() => {
    const { name, exerciseType } = exerciseForm;

    if (!exerciseType) {
      return;
    }

    if (exercise) {
      updateExercise({ id: exercise.id, exerciseUpdateRequest: { name } });
    } else {
      addExercise({ exerciseCreateRequest: { name, exerciseTypeId: exerciseType } });
    }

    close();
  }, [exercise, exerciseForm]);

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>{exercise ? 'Edit Exercise' : 'Create Exercise'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            size="small"
            margin="dense"
            label="Name"
            value={exerciseForm.name}
            onChange={(e) => update('name', e.target.value)}
          />
          <FormControl size="small" disabled={!!exercise}>
            <InputLabel id="exercise_type_label">Type</InputLabel>
            <Select
              label="Type"
              labelId="exercise_type_label"
              value={exerciseForm.exerciseType ?? ''}
              onChange={(e) => update('exerciseType', e.target.value as number)}
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
        <Button variant="text" onClick={close}>
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
