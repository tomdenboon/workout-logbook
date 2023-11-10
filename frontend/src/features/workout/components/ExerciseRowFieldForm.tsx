import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { ExerciseRowFieldResponse } from 'src/store/baseMonkeylogApi';
import { useUpdateExerciseRowFieldMutation } from 'src/store/monkeylogApi';

interface ExerciseRowFieldProps {
  workoutId: string;
  exerciseGroupId: string;
  exerciseRowId: string;
  exerciseRowField: ExerciseRowFieldResponse;
}

function ExerciseRowFieldForm(props: ExerciseRowFieldProps) {
  const { workoutId, exerciseGroupId, exerciseRowId, exerciseRowField } = props;
  const [field, setField] = useState(exerciseRowField);
  const [updateExerciseRowField] = useUpdateExerciseRowFieldMutation();

  const updateField = async () => {
    if (exerciseRowField.value === field.value) {
      return;
    }

    updateExerciseRowField({
      workoutId,
      exerciseGroupId,
      exerciseRowId,
      exerciseRowFieldId: field.id,
      exerciseRowFieldUpdateRequest: field,
    });
  };

  const cleanFieldInput = (newInput: string) => {
    // also clear trim 0's in front of string
    const x = newInput.replace(/\D/g, '').replace(/^0+/, '');
    return x ? Number(x) : undefined;
  };

  return (
    <TextField
      sx={{
        '& .MuiInputBase-root': {
          '& input': {
            textAlign: 'center',
          },
          height: 24,
        },
      }}
      fullWidth
      hiddenLabel
      value={field.value ?? ''}
      onChange={(e) => setField({ ...field, value: cleanFieldInput(e.target.value) })}
      onFocus={(e) => e.target.select()}
      onBlur={updateField}
    />
  );
}

const ExerciseRowFieldFormMemo = React.memo(ExerciseRowFieldForm);
export default ExerciseRowFieldFormMemo;
