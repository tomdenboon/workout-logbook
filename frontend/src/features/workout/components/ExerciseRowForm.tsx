import { Check } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import React, { useCallback } from 'react';
import ExerciseRowFieldForm from 'src/features/workout/components/ExerciseRowFieldForm';
import {
  ExerciseRowResponse,
  WorkoutResponse,
  useUpdateExerciseRowMutation,
} from 'src/store/workoutLogbookApi';

interface ExerciseRowFormProps {
  exerciseRow: ExerciseRowResponse;
  exerciseRowIndex: number;
  workoutId: string;
  exerciseGroupId: string;
  workoutType: WorkoutResponse['workoutType'];
  rows: (keyof Pick<ExerciseRowResponse, 'distance' | 'weight' | 'reps' | 'time'>)[];
}

function ExerciseRowForm(props: ExerciseRowFormProps) {
  const { workoutId, exerciseGroupId, exerciseRow, workoutType, exerciseRowIndex, rows } = props;
  const [updateRow] = useUpdateExerciseRowMutation();

  const onBlur = useCallback(
    (key: keyof ExerciseRowResponse, value: number | undefined | boolean) => {
      if (exerciseRow[key] === value) return;

      updateRow({
        workoutId,
        exerciseGroupId,
        exerciseRowId: exerciseRow.id,
        exerciseRowUpdateRequest: {
          ...exerciseRow,
          [key]: value,
        },
      });
    },
    [exerciseGroupId, exerciseRow, updateRow, workoutId]
  );

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
      {rows.map((row) => (
        <ExerciseRowFieldForm
          key={row}
          type={row}
          exerciseRow={exerciseRow}
          onBlur={onBlur}
          workoutType={workoutType}
        />
      ))}
      <Button
        sx={{ maxHeight: 24, maxWidth: 32, minWidth: 32 }}
        variant={exerciseRow.lifted ? 'contained' : 'outlined'}
        color={exerciseRow.lifted ? 'success' : 'primary'}
        onClick={() => onBlur('lifted', !exerciseRow.lifted)}
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
