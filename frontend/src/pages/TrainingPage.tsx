import { Button, Grid, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddItemCard from 'components/AddItemCard';
import AppHeader from 'components/AppHeader';
import Section from 'components/Section';
import AddWorkoutModal from 'features/workout/components/AddWorkoutModal';
import WorkoutCard from 'features/workout/components/WorkoutCard';
import { useGetWorkoutsQuery, useStartEmptyWorkoutMutation } from 'services/monkeylogApi';
import { WorkoutType } from 'features/workout/types';
import AppContainer from 'components/AppContainer';

function TrainingPage() {
  const { data: workouts } = useGetWorkoutsQuery({ type: WorkoutType.Template });
  const [startEmptyWorkout, { data }] = useStartEmptyWorkoutMutation();
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      navigate(`/training/workouts/${data.id}`);
    }
  }, [data]);

  return (
    <AppContainer header={<AppHeader title="Workouts" />}>
      <Stack spacing={2}>
        <Button size="small" onClick={() => startEmptyWorkout()} variant="contained">
          Start empty workout
        </Button>
        <Stack spacing={1}>
          <Section
            title="Workout templates"
            collapse
            rightNode={
              <Button
                startIcon={<Add />}
                onClick={() => setOpen(true)}
                variant="outlined"
                sx={{ height: 20 }}
                size="small"
              >
                Create
              </Button>
            }
          >
            {workouts && (
              <Grid container spacing={1}>
                {workouts.length === 0 && (
                  <Grid xs={12} sm={6} md={4}>
                    <AddItemCard onClick={() => setOpen(true)} />
                  </Grid>
                )}
                {workouts.map((val) => (
                  <Grid xs={12} sm={6} md={4} key={val.id}>
                    <WorkoutCard key={val.id} workout={val} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Section>
          <Section
            title="Program templates"
            collapse
            rightNode={
              <Button
                startIcon={<Add />}
                onClick={() => setOpen(true)}
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
                <AddItemCard onClick={() => setOpen(true)} />
              </Grid>
            </Grid>
          </Section>
        </Stack>
      </Stack>
      <AddWorkoutModal isOpen={isOpen} setIsOpen={setOpen} />
    </AppContainer>
  );
}

export default TrainingPage;
