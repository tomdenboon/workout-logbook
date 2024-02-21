import { Button, Collapse, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import FullScreenModal from 'src/components/FullScreenModal';
import SimpleTimer from 'src/components/SimpleTimer';
import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useCompleteWorkoutMutation,
  useGetExerciseCategoriesQuery,
  useLazyGetWorkoutQuery,
} from 'src/store/monkeylogApi';
import { ModalOutlet, useModalOutletContext } from 'src/components/ModalOutlet';
import ExerciseGroupForm from 'src/features/workout/components/ExerciseGroupForm';
import { TransitionGroup } from 'react-transition-group';
import { LineWeight, Timer } from '@mui/icons-material';

const TITLE_MAP = {
  COMPLETED: 'Edit workout',
  TEMPLATE: 'Edit workout',
  ACTIVE: 'Active workout',
};

const KEYBOARD_HEIGHT = 40;

function WorkoutPage() {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  const { modalControls } = useModalOutletContext();
  const [completeWorkout] = useCompleteWorkoutMutation();
  const [getWorkout, { data: workout }] = useLazyGetWorkoutQuery();
  const { data: exerciseCategories } = useGetExerciseCategoriesQuery();

  useEffect(() => {
    if (workoutId) {
      getWorkout({ id: workoutId }, true);
    }
  }, [workoutId, getWorkout]);

  const footer = useMemo(
    () =>
      workout?.workoutType === 'ACTIVE' ? (
        <Paper elevation={2}>
          <Container maxWidth="lg" sx={{ display: 'flex', gap: 2, p: 2 }}>
            <Button fullWidth startIcon={<Timer />} variant="outlined">
              Timer
            </Button>
            <Button fullWidth startIcon={<LineWeight />} variant="outlined">
              Plate calculator
            </Button>
          </Container>
        </Paper>
      ) : undefined,
    [workout?.workoutType]
  );

  return workout && exerciseCategories ? (
    <FullScreenModal
      slideUp
      sx={{ pt: 2, pb: KEYBOARD_HEIGHT + 2 }}
      header={{
        title: TITLE_MAP[workout.workoutType],
        rightButton: workout.workoutType === 'ACTIVE' && (
          <Button
            color="inherit"
            variant="text"
            onClick={() => completeWorkout().unwrap().then(modalControls.onClose)}
          >
            Complete
          </Button>
        ),
      }}
      footer={footer}
      {...modalControls}
    >
      <Stack>
        <div>
          <Typography>{workout.name}</Typography>
          <Typography>{workout.note}</Typography>
          {workout.workoutType !== 'TEMPLATE' && (
            <SimpleTimer startDate={workout.startDate} endDate={workout.endDate} />
          )}
        </div>
        {workout.exerciseGroups?.length > 0 && (
          <Stack component={TransitionGroup}>
            {workout.exerciseGroups.map((exerciseGroup, index) => (
              <Collapse key={exerciseGroup.id}>
                <ExerciseGroupForm
                  exerciseGroup={exerciseGroup}
                  exerciseGroupIndex={index}
                  workoutId={workout.id}
                  workoutType={workout.workoutType}
                  exerciseCategories={exerciseCategories}
                />
              </Collapse>
            ))}
          </Stack>
        )}
        <Button variant="outlined" sx={{ height: 24, mt: 4 }} onClick={() => navigate('exercises')}>
          Add exercise
        </Button>
        <Button
          variant="outlined"
          sx={{ height: 24, mt: 4 }}
          color="error"
          onClick={() => navigate('delete')}
        >
          {workout.workoutType === 'ACTIVE' ? 'Cancel workout' : 'Delete workout'}
        </Button>
      </Stack>
      <Paper sx={{ height: KEYBOARD_HEIGHT * 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={1}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((i) => (
              <Grid item xs={4}>
                <Button variant="contained" sx={{ width: '100%', height: '100%' }}>
                  {i}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Paper>
      <ModalOutlet />
    </FullScreenModal>
  ) : null;
}

export default WorkoutPage;
