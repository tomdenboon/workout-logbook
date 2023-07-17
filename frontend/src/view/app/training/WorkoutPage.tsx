import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Card, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useCompleteWorkoutMutation,
  useDeleteWorkoutMutation,
  useLazyGetWorkoutQuery,
} from '../../../api/monkeylogApi';
import Modal from '../../../components/Modal';
import { Workout, WorkoutType } from '../../../types/Workout';
import AppGridContainer from '../components/AppGridContainer';
import AppHeader from '../components/AppHeader';
import useTimer from '../../../hooks/useTimer';
import ExerciseGroupForm from './components/ExerciseGroupForm';

const TITLE_MAP = {
  [WorkoutType.Complete]: 'Edit completed workout',
  [WorkoutType.Template]: 'Edit template',
  [WorkoutType.Active]: 'Active workout',
};

function WorkoutHeader({ workout }: { workout?: Workout }) {
  const [completeWorkout, { isSuccess }] = useCompleteWorkoutMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate('/profile');
    }
  }, [isSuccess]);

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
              completeWorkout();
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

function Timer(props: { startDate?: string; endDate?: string }) {
  const { startDate, endDate } = props;
  const { digitalTimerFormat } = useTimer(startDate, endDate);

  return <Typography>Time: {digitalTimerFormat}</Typography>;
}

function WorkoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [getWorkout, { data: workout }] = useLazyGetWorkoutQuery();
  const [deleteWorkout] = useDeleteWorkoutMutation();

  useEffect(() => {
    if (id) {
      getWorkout(parseInt(id, 10), true);
    }
  }, [id]);

  return (
    <AppGridContainer header={<WorkoutHeader workout={workout} />}>
      {workout && (
        <Stack spacing={2}>
          <Card sx={{ p: 2 }} variant="outlined">
            <Typography>{workout.name}</Typography>
            <Typography>{workout.note}</Typography>
            {workout.type !== WorkoutType.Template && (
              <Timer startDate={workout.startDate} endDate={workout.endDate} />
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
              <>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => setIsOpen(true)}
                >
                  Cancel workout
                </Button>

                <Modal title="Cancel workout" isOpen={isOpen} onClose={() => setIsOpen(false)}>
                  <Button
                    variant="text"
                    onClick={() => {
                      deleteWorkout(workout.id);
                      navigate('/training');
                    }}
                  >
                    CONFIRM
                  </Button>
                </Modal>
              </>
            )}
          </Stack>
        </Stack>
      )}
    </AppGridContainer>
  );
}

export default WorkoutPage;
