import { Button, Grid, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import AddItemCard from 'components/AddItemCard';
import Section from 'components/Section';
import AddWorkoutModal from 'features/workout/components/AddWorkoutModal';
import WorkoutCard from 'features/workout/components/WorkoutCard';
import AppContainer from 'components/AppContainer';
import StartWorkoutModal from 'features/workout/components/StartWorkoutModal';
import useModal from 'hooks/useModal';
import { WorkoutFullResponse, useGetWorkoutsQuery } from 'store/monkeylogApi';

const useWorkoutModalState = () => {
  const [workout, setWorkout] = useState<WorkoutFullResponse | undefined>();
  const modalState = useModal();

  const open = (newWorkout?: WorkoutFullResponse) => {
    setWorkout(newWorkout);
    modalState.open();
  };

  return { ...modalState, open, workout };
};

function TrainingPage() {
  const { data: workouts } = useGetWorkoutsQuery({ workoutType: 'TEMPLATE' });
  const startWorkoutModal = useWorkoutModalState();
  const addWorkoutModal = useModal();

  return (
    <AppContainer header={{ title: 'Workouts' }}>
      <Stack spacing={2}>
        <Button onClick={() => startWorkoutModal.open()} variant="contained">
          Start empty workout
        </Button>
        <Stack spacing={1}>
          <Section
            title="Workout templates"
            collapse
            rightNode={
              <Button
                startIcon={<Add />}
                onClick={addWorkoutModal.open}
                variant="outlined"
                sx={{ height: 24, px: 1, minWidth: 0, py: 0 }}
              >
                Create
              </Button>
            }
          >
            {workouts && (
              <Grid container spacing={1}>
                {workouts.content.length === 0 && (
                  <Grid item xs={12} sm={6} md={4}>
                    <AddItemCard onClick={addWorkoutModal.open} />
                  </Grid>
                )}
                {workouts.content.map((val) => (
                  <Grid item xs={12} sm={6} md={4} key={val.id}>
                    <WorkoutCard
                      onClick={() => startWorkoutModal.open(val)}
                      key={val.id}
                      workout={val}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
          </Section>
          {/* <Section
            title="Program templates"
            collapse
            rightNode={
              <Button
                startIcon={<Add />}
                onClick={addWorkoutModal.open}
                variant="outlined"
                sx={{ height: 20, p: 0, px: 1 }}
                size="small"
              >
                Create
              </Button>
            }
          >
            <Grid container>
              <Grid item xs={12} sm={6} md={4}>
                <AddItemCard onClick={addWorkoutModal.open} />
              </Grid>
            </Grid>
          </Section> */}
        </Stack>
      </Stack>
      <AddWorkoutModal {...addWorkoutModal} />
      <StartWorkoutModal {...startWorkoutModal} />
    </AppContainer>
  );
}

export default TrainingPage;
