import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ExerciseRowFieldResponse } from "src/store/baseMonkeylogApi";
import { useUpdateExerciseRowFieldMutation } from "src/store/monkeylogApi";

interface ExerciseRowFieldProps {
  workoutId: string;
  exerciseGroupId: string;
  exerciseRowId: string;
  exerciseRowField: ExerciseRowFieldResponse;
  isLifted: boolean;
}

function ExerciseRowFieldForm(props: ExerciseRowFieldProps) {
  const { workoutId, exerciseGroupId, exerciseRowId, exerciseRowField, isLifted } = props;
  const [field, setField] = useState(exerciseRowField);
  const [newField, setNewField] = useState(exerciseRowField);
  const [updateExerciseRowField] = useUpdateExerciseRowFieldMutation();

  useEffect(() => {
    if (!isLifted) {
      setNewField((newField) => ({ ...newField, value: 0 }));
    } else {
      setNewField({ ...field });
    }
  }, [field, isLifted]);

  const updateField = async () => {
    if (newField.value === undefined || newField.value === field.value) {
      return;
    }

    updateExerciseRowField({
      workoutId,
      exerciseGroupId,
      exerciseRowId,
      exerciseRowFieldId: newField.id,
      exerciseRowFieldUpdateRequest: newField,
    });
    setField(newField);
  };

  const cleanFieldInput = (newInput: string) => {
    // also clear trim 0's in front of string
    return Number(newInput.replace(/\D/g, '').replace(/^0+/, ''));
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
      type="tel"
      value={newField.value}
      placeholder={field.value.toString()}
      onChange={(e) => setNewField({ ...newField, value: cleanFieldInput(e.target.value) })}
      onBlur={updateField}
    />
  );
}

const ExerciseRowFieldFormMemo = React.memo(ExerciseRowFieldForm);
export default ExerciseRowFieldFormMemo;