import { Check } from '@mui/icons-material';
import { Button, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  ExerciseRowFieldResponse,
  ExerciseRowResponse,
  WorkoutResponse,
  useUpdateRowFieldMutation,
  useUpdateRowMutation,
} from 'store/monkeylogApi';

interface ExerciseRowFieldProps {
  exerciseRowField: ExerciseRowFieldResponse;
  isLifted: boolean;
}

function ExerciseRowFieldForm(props: ExerciseRowFieldProps) {
  const { exerciseRowField, isLifted } = props;
  const [field, setField] = useState(exerciseRowField);
  const [newField, setNewField] = useState(exerciseRowField);
  const [updateExerciseRowField] = useUpdateRowFieldMutation();

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
      exerciseRowFieldId: newField.id,
      exerciseRowFieldUpdateRequest: newField,
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
          height: 20,
        },
      }}
      fullWidth
      hiddenLabel
      type="tel"
      value={newField.value ?? undefined}
      placeholder={field.value || '0'}
      onChange={(e) => setNewField({ ...newField, value: cleanFieldInput(e.target.value) })}
      onBlur={() => updateField()}
    />
  );
}

interface ExerciseRowFormProps {
  exerciseRow: ExerciseRowResponse;
  workoutId: number;
  workoutType: WorkoutResponse['type'];
  exerciseRowIndex: number;
  exerciseGroupIndex: number;
}

function ExerciseRowForm(props: ExerciseRowFormProps) {
  const { exerciseRow, workoutType, exerciseRowIndex } = props;
  const [updateRow] = useUpdateRowMutation();

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
            sx={{ maxHeight: 20, maxWidth: 32, minWidth: 32 }}
            color="info"
            {...draggable.dragHandleProps}
          >
            {exerciseRowIndex + 1}
          </Button>
          {exerciseRow.exerciseRowFields.map((exerciseRowField) => (
            <ExerciseRowFieldForm
              key={exerciseRowField.id}
              exerciseRowField={exerciseRowField}
              isLifted={exerciseRow.isLifted}
            />
          ))}
          <Button
            sx={{ maxHeight: 20, maxWidth: 32, minWidth: 32 }}
            variant="outlined"
            color={exerciseRow.isLifted ? 'success' : 'primary'}
            onClick={() =>
              updateRow({
                id: exerciseRow.id,
                exerciseRowUpdateRequest: { isLifted: !exerciseRow.isLifted },
              })
            }
            disabled={!(workoutType === 'ACTIVE')}
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
