import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './app/AppLayout';
import Exercise from './app/exercises/ExercisePage';
import Exercises from './app/exercises/ExercisesPage';
import Profile from './app/profile/ProfilePage';
import Settings from './app/profile/SettingsPage';
import Statistics from './app/statistics/StatisticsPage';
import Workout from './app/workouts/WorkoutPage';
import Workouts from './app/workouts/WorkoutsPage';

function Router() {
  // useEffect(() => {
  //   applyTheme('base');
  // }, []);

  const mdTheme = createTheme();

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="app" element={<App />}>
            <Route path="profile" element={<Profile />} />
            <Route path="profile/settings" element={<Settings />} />
            <Route path="workouts" element={<Workouts />} />
            <Route path="workouts/:id" element={<Workout />} />
            <Route path="workouts/:workoutId/exercises" element={<Exercises />} />
            <Route path="exercises" element={<Exercises />} />
            <Route path="exercises/:exerciseId" element={<Exercise />} />
            <Route path="statistics" element={<Statistics />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Router;
