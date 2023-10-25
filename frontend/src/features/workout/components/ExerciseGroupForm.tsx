import { Button, Collapse, Stack, Typography } from '@mui/material';
import ExerciseRowForm from 'src/features/workout/components/ExerciseRowForm';
import {
  ExerciseGroupResponse,
  useCreateExerciseRowMutation,
  useDeleteExerciseGroupMutation,
} from 'src/store/monkeylogApi';
import React from 'react';
import ActionDropdown from 'src/components/ActionDropdown';
import { TransitionGroup } from 'react-transition-group';

interface ExerciseGroupProps {
  exerciseGroup: ExerciseGroupResponse;
  exerciseGroupIndex: number;
  workoutId: string;
  workoutType: 'COMPLETED' | 'TEMPLATE' | 'ACTIVE';
}

function ExerciseGroupForm(props: ExerciseGroupProps) {
  const { exerciseGroup, workoutId, workoutType } = props;
  const [addExerciseRow] = useCreateExerciseRowMutation();
  const [deleteExerciseGroup] = useDeleteExerciseGroupMutation();

  return (
    <Stack sx={{ pt: 1 }}>
      <Stack direction="row" sx={{ mb: 1 }} justifyContent="space-between">
        <Typography fontWeight={800} color="primary">
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
        {exerciseGroup.exercise.exerciseCategory.exerciseTypes.map((exerciseType) => (
          <Typography
            key={exerciseType.id}
            sx={{ width: '100%' }}
            variant="body2"
            fontWeight={800}
            align="center"
          >
            {exerciseType.name}
          </Typography>
        ))}
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
                exerciseCategory={exerciseGroup.exercise.exerciseCategory}
                workoutType={workoutType}
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
