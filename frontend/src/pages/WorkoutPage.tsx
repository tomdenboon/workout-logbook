import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import AppContainer from 'components/AppContainer';
import AppHeader from 'components/AppHeader';
import SimpleTimer from 'components/SimpleTimer';
import DeleteWorkoutModal from 'features/workout/components/DeleteWorkoutModal';
import ExerciseGroupForm from 'features/workout/components/ExerciseGroupForm';
import { WorkoutType, Workout } from 'features/workout/types';
import useModal from 'hooks/useModal';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCompleteWorkoutMutation, useLazyGetWorkoutQuery } from 'services/monkeylogApi';

const TITLE_MAP = {
  [WorkoutType.Complete]: 'Edit completed workout',
  [WorkoutType.Template]: 'Edit template',
  [WorkoutType.Active]: 'Active workout',
};

function WorkoutHeader({ workout }: { workout?: Workout }) {
  const [completeWorkout] = useCompleteWorkoutMutation();
  const navigate = useNavigate();

  return (
    <AppHeader
      LeftTitleButton={
        <IconButton
          component={Link}
          color="inherit"
          to={workout?.type === WorkoutType.Complete ? '/profile' : '/training'}
        >
          <ArrowBack />
        </IconButton>
      }
      RightButton={
        workout?.type === WorkoutType.Active && (
          <Button
            variant="text"
            color="inherit"
            onClick={() => {
              completeWorkout().then(() => navigate('/profile'));
            }}
          >
            COMPLETE
          </Button>
        )
      }
      title={workout ? TITLE_MAP[workout.type] : 'Workout'}
    />
  );
}
function WorkoutPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const deleteWorkoutModal = useModal();
  const [getWorkout, { data: workout }] = useLazyGetWorkoutQuery();

  useEffect(() => {
    if (id) {
      getWorkout(parseInt(id, 10), true);
    }
  }, [id]);

  return (
    <AppContainer header={<WorkoutHeader workout={workout} />}>
      {workout && (
        <>
          <Stack spacing={2}>
            <Card sx={{ p: 2 }} variant="outlined">
              <Typography>{workout.name}</Typography>
              <Typography>{workout.note}</Typography>
              {workout.type !== WorkoutType.Template && (
                <SimpleTimer startDate={workout.startDate} endDate={workout.endDate} />
              )}
            </Card>
            <Box>
              <Grid container spacing={1}>
                {workout.exerciseGroups.map((exerciseGroup, index) => (
                  <ExerciseGroupForm
                    key={exerciseGroup.id}
                    exerciseGroup={exerciseGroup}
                    exerciseGroupIndex={index}
                    workoutId={workout.id}
                    workoutType={workout.type}
                  />
                ))}
              </Grid>
            </Box>
            <Stack spacing={1}>
              <Button variant="outlined" size="small" onClick={() => navigate('exercises')}>
                Add exercise
              </Button>
              {workout.type === WorkoutType.Active && (
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
          <DeleteWorkoutModal id={workout.id} {...deleteWorkoutModal} />
        </>
      )}
    </AppContainer>
  );
}

export default WorkoutPage;
