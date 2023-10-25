import { Button, Grid, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import AddItemCard from 'src/components/AddItemCard';
import Section from 'src/components/Section';
import WorkoutCard from 'src/features/workout/components/WorkoutCard';
import { useGetWorkoutsQuery } from 'src/store/monkeylogApi';
import { ModalOutlet } from 'src/components/ModalOutlet';
import { useNavigate, useParams } from 'react-router-dom';
import AppContainer from 'src/components/AppContainer';

function TrainingPage() {
  const navigate = useNavigate();
  const { data: workouts } = useGetWorkoutsQuery({ workoutType: 'TEMPLATE' });
  const { workoutId } = useParams();
  const startWorkout = workouts?.content?.find((val) => val.id === workoutId);

  return (
    <AppContainer header={{ title: 'Workouts' }}>
      <Stack spacing={2}>
        <Button onClick={() => navigate('workouts/new/start')} variant="contained">
          Start empty workout
        </Button>
        <Stack spacing={1}>
          <Section
            title="Workout templates"
            collapse
            rightNode={
              <Button
                startIcon={<Add />}
                onClick={() => navigate('workouts/add')}
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
                    <AddItemCard item="template" onClick={() => navigate('workouts/add')} />
                  </Grid>
                )}
                {workouts.content.map((val) => (
                  <Grid item xs={12} sm={6} md={4} key={val.id}>
                    <WorkoutCard
                      onClick={() => navigate(`workouts/${val.id}/start`)}
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
      <ModalOutlet workout={startWorkout} />
    </AppContainer>
  );
}

export default TrainingPage;
