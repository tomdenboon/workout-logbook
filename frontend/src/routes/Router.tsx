import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ExercisesPage from 'pages/ExercisesPage';
import ProfilePage from 'pages/ProfilePage';
import ProgramPage from 'pages/ProgramPage';
import SettingsPage from 'pages/SettingsPage';
import StatisticsPage from 'pages/StatisticsPage';
import TrainingPage from 'pages/TrainingPage';
import WorkoutPage from 'pages/WorkoutPage';
import AppLayout from 'layouts/AppLayout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function Router() {
  // useEffect(() => {
  //   applyTheme('base');
  // }, []);

  const mdTheme = createTheme();

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
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
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default Router;
