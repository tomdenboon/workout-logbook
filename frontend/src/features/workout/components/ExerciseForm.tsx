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
import useForm from 'src/hooks/useForm';
import { useCallback, useEffect } from 'react';
import {
  ExerciseCategoryResponse,
  ExerciseResponse,
  useCreateExerciseMutation,
  useGetExerciseCategoriesQuery,
  useUpdateExerciseMutation,
} from 'src/store/monkeylogApi';

interface ExerciseFormProps {
  isOpen: boolean;
  close: () => void;
  exercise?: ExerciseResponse;
}

function ExerciseForm(props: ExerciseFormProps) {
  const { isOpen, close, exercise } = props;

  const [addExercise] = useCreateExerciseMutation();
  const [updateExercise] = useUpdateExerciseMutation();
  const { data: exerciseCategories } = useGetExerciseCategoriesQuery();
  const {
    data: exerciseForm,
    update,
    init,
  } = useForm<{
    name: string;
    exerciseCategory?: ExerciseCategoryResponse['id'];
  }>({
    name: '',
  });

  useEffect(() => {
    if (exercise) {
      init({
        name: exercise.name,
        exerciseCategory: exercise.exerciseCategory.id,
      });
    }
  }, [exercise]);

  const submitForm = useCallback(() => {
    const { name, exerciseCategory } = exerciseForm;

    if (!exerciseCategory) {
      return;
    }

    if (exercise) {
      updateExercise({ id: exercise.id, exerciseUpdateRequest: { name } });
    } else {
      addExercise({ exerciseCreateRequest: { name, exerciseCategory } });
    }

    close();
  }, [exercise, exerciseForm]);

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>
        {exercise ? 'Edit Exercise' : 'Create Exercise'}
      </DialogTitle>
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
              value={exerciseForm.exerciseCategory ?? ''}
              onChange={(e) =>
                update(
                  'exerciseCategory',
                  e.target.value as (typeof exerciseForm)['exerciseCategory'],
                )
              }
            >
              {exerciseCategories?.map((et) => (
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
