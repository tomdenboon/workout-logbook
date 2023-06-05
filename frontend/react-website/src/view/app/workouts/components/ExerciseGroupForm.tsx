import { MoreVert } from '@mui/icons-material';
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import {
  useAddExerciseRowMutation,
  useSwapExerciseRowMutation,
} from '../../../../api/monkeylogApi';
import { ExerciseGroup, WorkoutType } from '../../../../types/Workout';
import ExerciseRowForm from './ExerciseRowForm';

interface ExerciseGroupProps {
  exerciseGroup: ExerciseGroup;
  exerciseGroupIndex: number;
  workoutId: number;
  workoutType: WorkoutType;
}

function ExerciseGroupForm(props: ExerciseGroupProps) {
  const { exerciseGroup, exerciseGroupIndex, workoutId, workoutType } = props;
  const [addExerciseRow] = useAddExerciseRowMutation();
  const [swapExerciseRow] = useSwapExerciseRowMutation();

  function onDragEnd(drag: DropResult) {
    if (!drag.destination) {
      return;
    }

    swapExerciseRow({
      id: exerciseGroup.id,
      workoutId,
      exerciseGroupIndex,
      oldIndex: drag.source.index,
      newIndex: drag.destination.index,
    });
  }

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card variant="outlined">
        <Stack sx={{ p: 2 }}>
          <Stack direction="row" sx={{ mb: 1 }}>
            <Typography fontWeight={800} color="primary">
              {exerciseGroup.exercise.name}
            </Typography>
            <Button variant="outlined" sx={{ ml: 'auto', height: 24, minWidth: 36, maxWidth: 36 }}>
              <MoreVert />
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Typography
              sx={{ minWidth: 36, maxWidth: 36 }}
              variant="body2"
              fontWeight={800}
              align="center"
            >
              Set
            </Typography>
            {exerciseGroup.exercise.exerciseType.exerciseFields.map((exerciseField) => (
              <Typography sx={{ flexGrow: 1 }} variant="body2" fontWeight={800} align="center">
                {exerciseField.type[0] + exerciseField.type.slice(1).toLowerCase()}
              </Typography>
            ))}
            <Typography sx={{ minWidth: 36, maxWidth: 36 }} align="center" />
          </Stack>
          <DragDropContext onDragEnd={(a) => onDragEnd(a)}>
            <Droppable droppableId="droppable">
              {(droppable) => (
                <Stack spacing={0} {...droppable.droppableProps} ref={droppable.innerRef}>
                  {exerciseGroup.exerciseRows.map((exerciseRow, index) => (
                    <ExerciseRowForm
                      key={exerciseRow.id}
                      exerciseRow={exerciseRow}
                      workoutId={workoutId}
                      workoutType={workoutType}
                      exerciseGroupIndex={exerciseGroupIndex}
                      exerciseRowIndex={index}
                    />
                  ))}
                  {droppable.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>
          <Button
            sx={{ height: 24 }}
            variant="text"
            onClick={() => addExerciseRow({ id: exerciseGroup.id, workoutId, exerciseGroupIndex })}
          >
            Add exercise set
          </Button>
        </Stack>
      </Card>
    </Grid>
  );
}

export default React.memo(ExerciseGroupForm);
