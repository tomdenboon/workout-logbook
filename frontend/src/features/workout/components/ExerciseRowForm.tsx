import { Check } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import React from 'react';
import ExerciseRowFieldForm from 'src/features/workout/components/ExerciseRowFieldForm';
import useForm from 'src/hooks/useForm';
import {
  ExerciseRowResponse,
  WorkoutResponse,
  useUpdateExerciseRowMutation,
} from 'src/store/monkeylogApi';

interface ExerciseRowFormProps {
  exerciseRow: ExerciseRowResponse;
  exerciseRowIndex: number;
  workoutId: string;
  exerciseGroupId: string;
  workoutType: WorkoutResponse['workoutType'];
}

function ExerciseRowForm(props: ExerciseRowFormProps) {
  const { workoutId, exerciseGroupId, exerciseRow, workoutType, exerciseRowIndex } = props;
  const [updateRow] = useUpdateExerciseRowMutation();
  const { data: exerciseRowForm, update } = useForm(exerciseRow, { resetOnInitialChange: true });

  return (
    <Stack sx={{ mb: 1 }} direction="row" spacing={1}>
      <Button
        onClick={() => {}}
        component="div"
        variant="outlined"
        size="small"
        sx={{ maxHeight: 24, maxWidth: 32, minWidth: 32 }}
        color="info"
      >
        {exerciseRowIndex + 1}
      </Button>
      <ExerciseRowFieldForm
        val={exerciseRowForm.reps}
        setVal={(v) => update('reps', v)}
        onBlur={() =>
          updateRow({
            workoutId,
            exerciseGroupId,
            exerciseRowId: exerciseRow.id,
            exerciseRowUpdateRequest: exerciseRowForm,
          })
        }
      />
      <Button
        sx={{ maxHeight: 24, maxWidth: 32, minWidth: 32 }}
        variant={exerciseRow.lifted ? 'contained' : 'outlined'}
        color={exerciseRow.lifted ? 'success' : 'primary'}
        onClick={() => {
          updateRow({
            workoutId,
            exerciseGroupId,
            exerciseRowId: exerciseRow.id,
            exerciseRowUpdateRequest: {
              ...exerciseRowForm,
              lifted: !exerciseRowForm.lifted,
            },
          });
        }}
        disabled={!(workoutType === 'ACTIVE')}
        type="button"
      >
        <Check />
      </Button>
    </Stack>
  );
}

const MemoizedExerciseRow = React.memo(ExerciseRowForm);
export default MemoizedExerciseRow;
