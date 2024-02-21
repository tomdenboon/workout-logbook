import { Check } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import React from 'react';
import ExerciseRowFieldForm from 'src/features/workout/components/ExerciseRowFieldForm';
import {
  ExerciseRowResponse,
  ValidFields,
  WorkoutResponse,
  useUpdateExerciseRowMutation,
} from 'src/store/monkeylogApi';

interface ExerciseRowFormProps {
  exerciseRow: ExerciseRowResponse;
  exerciseRowIndex: number;
  workoutId: string;
  exerciseGroupId: string;
  workoutType: WorkoutResponse['workoutType'];
  validFields: ValidFields;
}

function ExerciseRowForm(props: ExerciseRowFormProps) {
  const { workoutId, exerciseGroupId, exerciseRow, workoutType, exerciseRowIndex, validFields } =
    props;
  const [updateRow] = useUpdateExerciseRowMutation();

  const onBlur = (key: keyof ExerciseRowResponse, value: number | undefined | boolean) => {
    updateRow({
      workoutId,
      exerciseGroupId,
      exerciseRowId: exerciseRow.id,
      exerciseRowUpdateRequest: {
        ...exerciseRow,
        [key]: value,
      },
    });
  };

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
      {validFields.reps && (
        <ExerciseRowFieldForm
          val={exerciseRow.reps}
          onBlur={(val: number | undefined) => onBlur('reps', val)}
        />
      )}
      {validFields.time && (
        <ExerciseRowFieldForm
          val={exerciseRow.time}
          type="time"
          onBlur={(val: number | undefined) => onBlur('time', val)}
        />
      )}
      {validFields.weight && (
        <ExerciseRowFieldForm
          val={exerciseRow.weight}
          onBlur={(val: number | undefined) => onBlur('weight', val)}
        />
      )}
      {validFields.distance && (
        <ExerciseRowFieldForm
          val={exerciseRow.distance}
          onBlur={(val: number | undefined) => onBlur('distance', val)}
        />
      )}
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
