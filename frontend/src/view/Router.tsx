import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppPage from './app/AppPage';
import ExercisesPage from './app/exercises/ExercisesPage';
import ProfilePage from './app/profile/ProfilePage';
import SettingsPage from './app/profile/SettingsPage';
import StatisticsPage from './app/statistics/StatisticsPage';
import WorkoutPage from './app/training/WorkoutPage';
import TrainingPage from './app/training/TrainingPage';
import ProgramPage from './app/training/ProgramPage';

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
          <Route element={<AppPage />}>
            <Route index element={<Navigate to="/profile" />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="profile/settings" element={<SettingsPage />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="training/programs/:id" element={<ProgramPage />} />
            <Route path="training/workouts/:id" element={<WorkoutPage />} />
            <Route path="training/workouts/:workoutId/exercises" element={<ExercisesPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default Router;
