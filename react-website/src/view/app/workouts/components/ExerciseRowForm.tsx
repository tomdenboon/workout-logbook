import { Check } from '@mui/icons-material';
import { Button, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  useUpdateExerciseRowFieldMutation,
  useUpdateExerciseRowMutation,
} from '../../../../api/monkeylogApi';
import { ExerciseRow, ExerciseRowField, WorkoutType } from '../../../../types/Workout';

interface ExerciseRowFieldProps {
  exerciseRowField: ExerciseRowField;
  workoutId: number;
  exerciseGroupIndex: number;
  exerciseRowIndex: number;
  exerciseRowFieldIndex: number;
  isLifted: boolean;
}

function ExerciseRowFieldForm(props: ExerciseRowFieldProps) {
  const {
    exerciseRowField,
    workoutId,
    exerciseGroupIndex,
    exerciseRowIndex,
    exerciseRowFieldIndex,
    isLifted,
  } = props;
  const [field, setField] = useState(exerciseRowField);
  const [newField, setNewField] = useState(exerciseRowField);
  const [updateExerciseRowField] = useUpdateExerciseRowFieldMutation();

  useEffect(() => {
    if (!isLifted) {
      setNewField({ ...newField, value: '' });
    } else {
      setNewField({ ...field });
    }
  }, [isLifted]);

  const updateField = async () => {
    if (!newField.value || newField.value === field.value) {
      return;
    }

    updateExerciseRowField({
      patch: newField,
      workoutId,
      exerciseGroupIndex,
      exerciseRowIndex,
      exerciseRowFieldIndex,
    });
    setField(newField);
  };

  const cleanFieldInput = (newInput: string) => {
    newInput.replace(/\D/g, '');

    return newInput;
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
      value={newField.value ?? undefined}
      placeholder={field.value || '0'}
      onChange={(e) => setNewField({ ...newField, value: cleanFieldInput(e.target.value) })}
      onBlur={() => updateField()}
    />
  );
}

interface ExerciseRowFormProps {
  exerciseRow: ExerciseRow;
  workoutId: number;
  workoutType: WorkoutType;
  exerciseRowIndex: number;
  exerciseGroupIndex: number;
}

function ExerciseRowForm(props: ExerciseRowFormProps) {
  const { exerciseRow, workoutId, workoutType, exerciseRowIndex, exerciseGroupIndex } = props;
  const [updateRow] = useUpdateExerciseRowMutation();

  return (
    <Draggable draggableId={exerciseRow.id.toString()} index={exerciseRowIndex}>
      {(draggable) => (
        <Stack
          sx={{ mb: 1 }}
          direction="row"
          spacing={1}
          ref={draggable.innerRef}
          {...draggable.draggableProps}
        >
          <Button
            onClick={() => {}}
            component="div"
            variant="outlined"
            size="small"
            sx={{ maxHeight: 24, maxWidth: 36, minWidth: 36 }}
            color="info"
            {...draggable.dragHandleProps}
          >
            {exerciseRowIndex + 1}
          </Button>
          {exerciseRow.exerciseRowFields.map((exerciseRowField, index) => (
            <ExerciseRowFieldForm
              key={exerciseRowField.id}
              exerciseRowField={exerciseRowField}
              workoutId={workoutId}
              exerciseGroupIndex={exerciseGroupIndex}
              exerciseRowIndex={exerciseRowIndex}
              exerciseRowFieldIndex={index}
              isLifted={exerciseRow.isLifted}
            />
          ))}
          <Button
            sx={{ maxHeight: 24, maxWidth: 36, minWidth: 36 }}
            variant="outlined"
            color={exerciseRow.isLifted ? 'success' : 'primary'}
            onClick={() =>
              updateRow({
                patch: { ...exerciseRow, isLifted: !exerciseRow.isLifted },
                exerciseGroupIndex,
                exerciseRowIndex,
                workoutId,
              })
            }
            disabled={!(workoutType === WorkoutType.Active)}
            type="button"
          >
            <Check />
          </Button>
        </Stack>
      )}
    </Draggable>
  );
}

export default React.memo(ExerciseRowForm);
