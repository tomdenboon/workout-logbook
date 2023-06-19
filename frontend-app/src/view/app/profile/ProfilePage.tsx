import { Button, Grid } from '@mui/material';
import { useGetWorkoutsQuery } from '../../../api/monkeylogApi';
import { WorkoutType } from '../../../types/Workout';
import AppGridContainer from '../components/AppGridContainer';
import AppHeader from '../components/AppHeader';
import WorkoutCompleteCard from '../workouts/components/WorkoutCompleteCard';

function Profile() {
  const { data: workouts } = useGetWorkoutsQuery({ type: WorkoutType.Complete });

  return (
    <AppGridContainer header={<AppHeader title="Profile" />}>
      {workouts && (
        <Grid container spacing={1}>
          {workouts.map((val) => (
            <Grid item xs={12} sm={6} md={4} key={val.id}>
              <WorkoutCompleteCard workout={val} />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button>LOAD MORE</Button>
          </Grid>
        </Grid>
      )}
    </AppGridContainer>
  );
}

export default Profile;
