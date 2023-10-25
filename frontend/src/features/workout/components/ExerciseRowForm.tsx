import { Check } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import React from 'react';
import ExerciseRowFieldForm from 'src/features/workout/components/ExerciseRowFieldForm';
import {
  ExerciseCategoryResponse,
  ExerciseRowResponse,
  WorkoutResponse,
  useUpdateExerciseRowMutation,
} from 'src/store/monkeylogApi';

interface ExerciseRowFormProps {
  exerciseCategory: ExerciseCategoryResponse;
  exerciseRow: ExerciseRowResponse;
  exerciseRowIndex: number;
  workoutId: string;
  exerciseGroupId: string;
  workoutType: WorkoutResponse['workoutType'];
}

function ExerciseRowForm(props: ExerciseRowFormProps) {
  const {
    workoutId,
    exerciseGroupId,
    exerciseRow,
    workoutType,
    exerciseCategory,
    exerciseRowIndex,
  } = props;
  const [updateRow] = useUpdateExerciseRowMutation();

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

      {exerciseCategory.exerciseTypes.map((exerciseType) => {
        const exerciseRowField = exerciseRow.exerciseRowFields.find(
          (erf) => erf.exerciseType === exerciseType.id
        );

        if (!exerciseRowField) return;

        return (
          <ExerciseRowFieldForm
            key={exerciseType.id}
            workoutId={workoutId}
            exerciseGroupId={exerciseGroupId}
            exerciseRowId={exerciseRow.id}
            exerciseRowField={exerciseRowField}
          />
        );
      })}
      <Button
        sx={{ maxHeight: 24, maxWidth: 32, minWidth: 32 }}
        variant={exerciseRow.isLifted ? 'contained' : 'outlined'}
        color={exerciseRow.isLifted ? 'success' : 'primary'}
        onClick={() =>
          updateRow({
            workoutId,
            exerciseGroupId,
            exerciseRowId: exerciseRow.id,
            exerciseRowUpdateRequest: { isLifted: !exerciseRow.isLifted },
          })
        }
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
