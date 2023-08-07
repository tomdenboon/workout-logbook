import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import AppContainer from 'components/AppContainer';
import AppHeader from 'components/AppHeader';
import SimpleTimer from 'components/SimpleTimer';
import DeleteWorkoutModal from 'features/workout/components/DeleteWorkoutModal';
import ExerciseGroupForm from 'features/workout/components/ExerciseGroupForm';
import useModal from 'hooks/useModal';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  WorkoutResponse,
  useCompleteWorkoutMutation,
  useLazyGetWorkoutQuery,
} from 'store/monkeylogApi';

const TITLE_MAP = {
  COMPLETED: 'Edit completed workout',
  TEMPLATE: 'Edit template',
  ACTIVE: 'Active workout',
};

function WorkoutHeader({ workout }: { workout?: WorkoutResponse }) {
  const [completeWorkout] = useCompleteWorkoutMutation();
  const navigate = useNavigate();

  return (
    <AppHeader
      LeftTitleButton={
        <IconButton
          component={Link}
          color="inherit"
          to={workout?.type === 'COMPLETED' ? '/history' : '/training'}
        >
          <ArrowBack />
        </IconButton>
      }
      RightButton={
        workout?.type === 'ACTIVE' && (
          <Button
            variant="text"
            color="inherit"
            onClick={() => {
              completeWorkout().then(() => navigate('/history'));
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
      getWorkout({ id: parseInt(id, 10) }, true);
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
              {workout.type !== 'TEMPLATE' && (
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
                      workoutType={workout.type}
                    />
                  ))}
                </Grid>
              </Box>
            )}
            <Stack spacing={1}>
              <Button variant="outlined" size="small" onClick={() => navigate('exercises')}>
                Add exercise
              </Button>
              {workout.type === 'ACTIVE' && (
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
