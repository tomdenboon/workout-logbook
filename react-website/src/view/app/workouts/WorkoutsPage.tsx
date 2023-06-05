import { Box, Button, Grid, IconButton, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useGetWorkoutsQuery, useStartEmptyWorkoutMutation } from '../../../api/monkeylogApi';
import { WorkoutType } from '../../../types/Workout';
import AppGridContainer from '../components/AppGridContainer';
import Header from '../components/AppHeader';
import AddWorkoutModal from './components/AddWorkoutModal';
import WorkoutCard from './components/WorkoutCard';

function Workoutss() {
  const { data: workouts } = useGetWorkoutsQuery({ type: WorkoutType.Template });
  const [startEmptyWorkout, { data }] = useStartEmptyWorkoutMutation();
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate(`/app/workouts/${data.id}`);
    }
  }, [data]);

  return (
    <AppGridContainer
      header={
        <Header
          RightButton={
            <IconButton onClick={() => setOpen(true)} color="inherit">
              <FiPlus />
            </IconButton>
          }
          title="Workouts"
        />
      }
    >
      <Stack spacing={1}>
        <Button onClick={() => startEmptyWorkout()} variant="contained">
          START EMPTY WORKOUT
        </Button>
        {workouts && (
          <Box>
            <Grid container spacing={1}>
              {workouts.map((val) => (
                <Grid item xs={12} sm={6} md={4} key={val.id}>
                  <WorkoutCard key={val.id} workout={val} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Stack>

      <AddWorkoutModal isOpen={isOpen} setIsOpen={setOpen} />
    </AppGridContainer>
  );
}

export default Workoutss;
