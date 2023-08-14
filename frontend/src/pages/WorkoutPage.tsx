import { Box, Button, Card, Grid, Stack, Typography } from '@mui/material';
import FullScreenModal from 'components/FullScreenModal';
import SimpleTimer from 'components/SimpleTimer';
import DeleteWorkoutModal from 'features/workout/components/DeleteWorkoutModal';
import ExerciseGroupForm from 'features/workout/components/ExerciseGroupForm';
import WorkoutContext from 'features/workout/context/WorkoutContext';
import useModal from 'hooks/useModal';
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCompleteWorkoutMutation, useLazyGetWorkoutQuery } from 'store/monkeylogApi';

const TITLE_MAP = {
  COMPLETED: 'Edit workout',
  TEMPLATE: 'Edit workout',
  ACTIVE: 'Active workout',
};

function WorkoutPage() {
  const { workoutId, closeWorkoutModal } = useContext(WorkoutContext);
  const navigate = useNavigate();
  const [completeWorkout] = useCompleteWorkoutMutation();
  const deleteWorkoutModal = useModal();
  const [getWorkout, { data: workout }] = useLazyGetWorkoutQuery();

  useEffect(() => {
    if (workoutId) {
      getWorkout({ id: workoutId }, true);
    }
  }, [workoutId]);

  return workout ? (
    <FullScreenModal
      header={{
        title: TITLE_MAP[workout.workoutType],
        rightButton: workout.workoutType === 'ACTIVE' && (
          <Button
            color="inherit"
            variant="text"
            onClick={() =>
              completeWorkout()
                .unwrap()
                .then(() => closeWorkoutModal())
            }
          >
            COMPLETE
          </Button>
        ),
      }}
      isOpen={!!workoutId && !!workout}
      close={closeWorkoutModal}
    >
      <Stack spacing={2}>
        <Card sx={{ p: 2 }} variant="outlined">
          <Typography>{workout.name}</Typography>
          <Typography>{workout.note}</Typography>
          {workout.workoutType !== 'TEMPLATE' && (
            <SimpleTimer startDate={workout.startDate} endDate={workout.endDate} />
          )}
        </Card>
        {workout.exerciseGroups?.length > 0 && (
          <Box>
            <Grid container spacing={1}>
              {workout.exerciseGroups.map((exerciseGroup, index) => (
                <ExerciseGroupForm
                  key={exerciseGroup.id}
                  exerciseGroup={exerciseGroup}
                  exerciseGroupIndex={index}
                  workoutId={workout.id}
                  workoutType={workout.workoutType}
                />
              ))}
            </Grid>
          </Box>
        )}
        <Stack spacing={1}>
          <Button variant="outlined" size="small" onClick={() => navigate('exercises')}>
            Add exercise
          </Button>
          {workout.workoutType === 'ACTIVE' && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => deleteWorkoutModal.open()}
            >
              Cancel workout
            </Button>
          )}
        </Stack>
      </Stack>
      <DeleteWorkoutModal
        workoutId={workout.id}
        closeWorkoutModal={closeWorkoutModal}
        {...deleteWorkoutModal}
      />
    </FullScreenModal>
  ) : null;
}

export default WorkoutPage;
