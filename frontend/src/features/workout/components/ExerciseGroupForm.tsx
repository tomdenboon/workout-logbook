import { Button, Collapse, Stack, Typography } from '@mui/material';
import ExerciseRowForm from 'src/features/workout/components/ExerciseRowForm';
import {
  ExerciseGroupResponse,
  GetExerciseCategoriesResponse,
  useCreateExerciseRowMutation,
  useDeleteExerciseGroupMutation,
} from 'src/store/monkeylogApi';
import React from 'react';
import ActionDropdown from 'src/components/ActionDropdown';
import { TransitionGroup } from 'react-transition-group';
import { Link } from 'react-router-dom';

interface ExerciseGroupProps {
  exerciseGroup: ExerciseGroupResponse;
  exerciseGroupIndex: number;
  exerciseCategories: GetExerciseCategoriesResponse;
  workoutId: string;
  workoutType: 'COMPLETED' | 'TEMPLATE' | 'ACTIVE';
}

function ExerciseGroupForm(props: ExerciseGroupProps) {
  const { exerciseGroup, workoutId, workoutType, exerciseCategories } = props;
  const [addExerciseRow] = useCreateExerciseRowMutation();
  const [deleteExerciseGroup] = useDeleteExerciseGroupMutation();
  const validFields = exerciseCategories[exerciseGroup.exercise.exerciseCategory].validFields;

  return (
    <Stack sx={{ pt: 4 }}>
      <Stack direction="row" sx={{ mb: 1 }} justifyContent="space-between">
        <Typography
          component={Link}
          to={'exercises/' + exerciseGroup.exercise.id + '/about'}
          fontWeight={800}
          color="primary"
        >
          {exerciseGroup.exercise.name}
        </Typography>
        <ActionDropdown
          actions={[
            {
              label: 'Delete',
              action: () => deleteExerciseGroup({ exerciseGroupId: exerciseGroup.id, workoutId }),
            },
          ]}
        />
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
        {validFields.reps && (
          <Typography sx={{ width: '100%' }} fontSize={14} fontWeight={800} align="center">
            Reps
          </Typography>
        )}

        {validFields.weight && (
          <Typography sx={{ width: '100%' }} fontSize={14} fontWeight={800} align="center">
            Weight
          </Typography>
        )}

        {validFields.time && (
          <Typography sx={{ width: '100%' }} fontSize={14} fontWeight={800} align="center">
            Time
          </Typography>
        )}

        {validFields.distance && (
          <Typography sx={{ width: '100%' }} fontSize={14} fontWeight={800} align="center">
            Distance
          </Typography>
        )}

        <Typography sx={{ minWidth: 32, maxWidth: 32 }} align="center" />
      </Stack>

      <Stack>
        <TransitionGroup>
          {exerciseGroup.exerciseRows.map((exerciseRow, index) => (
            <Collapse key={exerciseRow.id}>
              <ExerciseRowForm
                workoutId={workoutId}
                exerciseGroupId={exerciseGroup.id}
                exerciseRow={exerciseRow}
                exerciseRowIndex={index}
                workoutType={workoutType}
                validFields={validFields}
              />
            </Collapse>
          ))}
        </TransitionGroup>
      </Stack>

      <Button
        sx={{ height: 24 }}
        variant="outlined"
        onClick={() => addExerciseRow({ workoutId, exerciseGroupId: exerciseGroup.id })}
      >
        Add exercise set
      </Button>
    </Stack>
  );
}

const MemoizedExerciseGroupForm = React.memo(ExerciseGroupForm);
export default MemoizedExerciseGroupForm;
