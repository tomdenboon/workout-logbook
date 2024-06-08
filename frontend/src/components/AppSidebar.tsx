import { FitnessCenter, Person } from '@mui/icons-material';
import {
  BottomNavigationAction,
  Paper,
  BottomNavigation,
  Button,
  Stack,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetActiveWorkoutQuery } from 'src/store/workoutLogbookApi';

const NAVBAR_LIST = [
  { to: '/profile', text: 'Profile', Icon: Person },
  { to: '/training', text: 'Workout', Icon: FitnessCenter },
];

function AppSideBar() {
  const { data: activeWorkout } = useGetActiveWorkoutQuery();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {activeWorkout && (
        <Paper elevation={2}>
          <Stack
            alignItems="center"
            sx={{ p: 2, height: 56 }}
            direction="row"
            justifyContent="center"
            spacing={2}
          >
            <Typography>{activeWorkout.name}</Typography>
            <Button
              sx={{ height: 24 }}
              size="small"
              variant="contained"
              onClick={() =>
                navigate(location.pathname + '/workouts/' + activeWorkout.id.toString())
              }
            >
              Resume
            </Button>
          </Stack>
        </Paper>
      )}

      <Paper elevation={2}>
        <BottomNavigation
          showLabels
          value={NAVBAR_LIST.find((obj) => location.pathname.includes(obj.to))?.to}
          onChange={(_, newValue) => {
            navigate(newValue);
          }}
        >
          {NAVBAR_LIST.map(({ to, text, Icon }) => (
            <BottomNavigationAction key={to} value={to} label={text} icon={<Icon />} />
          ))}
        </BottomNavigation>
      </Paper>
    </>
  );
}
export default AppSideBar;
