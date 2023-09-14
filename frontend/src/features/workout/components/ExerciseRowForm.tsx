import { Check } from '@mui/icons-material';
import { Button, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import {
  ExerciseRowFieldResponse,
  ExerciseRowResponse,
  WorkoutResponse,
  useUpdateExerciseRowFieldMutation,
  useUpdateExerciseRowMutation,
} from 'src/store/monkeylogApi';

interface ExerciseRowFieldProps {
  workoutId: string;
  exerciseGroupId: string;
  exerciseRowId: string;
  exerciseRowField: ExerciseRowFieldResponse;
  isLifted: boolean;
}

function ExerciseRowFieldForm(props: ExerciseRowFieldProps) {
  const {
    workoutId,
    exerciseGroupId,
    exerciseRowId,
    exerciseRowField,
    isLifted,
  } = props;
  const [field, setField] = useState(exerciseRowField);
  const [newField, setNewField] = useState(exerciseRowField);
  const [updateExerciseRowField] = useUpdateExerciseRowFieldMutation();

  useEffect(() => {
    if (!isLifted) {
      setNewField({ ...newField, value: undefined });
    } else {
      setNewField({ ...field });
    }
  }, [isLifted]);

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
    if (newInput === '') {
      return undefined;
    }

    return Number(newInput.replace(/\D/g, ''));
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
      value={newField.value?.toString() ?? ''}
      placeholder={field.value?.toString() ?? '0'}
      onChange={(e) =>
        setNewField({ ...newField, value: cleanFieldInput(e.target.value) })
      }
      onBlur={updateField}
    />
  );
}

interface ExerciseRowFormProps {
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
    exerciseRowIndex,
  } = props;
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
            sx={{ maxHeight: 24, maxWidth: 32, minWidth: 32 }}
            color="info"
            {...draggable.dragHandleProps}
          >
            {exerciseRowIndex + 1}
          </Button>
          {exerciseRow.exerciseRowFields.map((exerciseRowField) => (
            <ExerciseRowFieldForm
              key={exerciseRowField.id}
              workoutId={workoutId}
              exerciseGroupId={exerciseGroupId}
              exerciseRowId={exerciseRow.id}
              exerciseRowField={exerciseRowField}
              isLifted={exerciseRow.isLifted}
            />
          ))}
          <Button
            sx={{ maxHeight: 24, maxWidth: 32, minWidth: 32 }}
            variant="outlined"
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
      )}
    </Draggable>
  );
}

export default React.memo(ExerciseRowForm);
