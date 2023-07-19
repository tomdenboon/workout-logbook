import { MoreHoriz } from '@mui/icons-material';
import { Button, Card, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useAddExerciseRowMutation } from '../../../../api/monkeylogApi';
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

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card variant="outlined">
        <Stack sx={{ p: 2 }}>
          <Stack direction="row" sx={{ mb: 1 }}>
            <Typography fontWeight={800} color="primary">
              {exerciseGroup.exercise.name}
            </Typography>
            <Button variant="outlined" sx={{ ml: 'auto', height: 20, minWidth: 32, maxWidth: 32 }}>
              <MoreHoriz />
            </Button>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Typography
              sx={{ minWidth: 32, maxWidth: 32 }}
              variant="body2"
              fontWeight={800}
              align="center"
            >
              Set
            </Typography>
            {exerciseGroup.exercise.exerciseType.exerciseFields.map((exerciseField) => (
              <Typography
                key={exerciseField.id}
                sx={{ flexGrow: 1 }}
                variant="body2"
                fontWeight={800}
                align="center"
              >
                {exerciseField.type[0] + exerciseField.type.slice(1).toLowerCase()}
              </Typography>
            ))}
            <Typography sx={{ minWidth: 32, maxWidth: 32 }} align="center" />
          </Stack>
          <DragDropContext onDragEnd={() => null}>
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
            sx={{ height: 20 }}
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
