import { Check } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ExerciseRowFieldForm from 'src/features/workout/components/ExerciseRowFieldForm';
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

const MemoizedExerciseRow = React.memo(ExerciseRowForm);
export default MemoizedExerciseRow;