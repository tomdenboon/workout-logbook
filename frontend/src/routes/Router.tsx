import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ExercisesPage from 'src/pages/ExercisesPage';
import HistoryPage from 'src/pages/HistoryPage';
import TrainingPage from 'src/pages/TrainingPage';
import AppLayout from 'src/layouts/AppLayout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ProfilePage from 'src/pages/ProfilePage';
import MeasurementPage from 'src/pages/MeasurementPage';
import AddMeasurementModal from 'src/features/measurement/components/AddMeasurementModal';
import AddMeasurementPointModal from 'src/features/measurement/components/AddMeasurementPointModal';
import SettingsPage from 'src/pages/SettingsPage';
import ExerciseForm from 'src/features/workout/components/ExerciseForm';
import AddWorkoutModal from 'src/features/workout/components/AddWorkoutModal';
import StartWorkoutModal from 'src/features/workout/components/StartWorkoutModal';
import WorkoutPage from 'src/pages/WorkoutPage';

function Router() {
  const mdTheme = createTheme({
    components: {
      MuiPopper: {
        defaultProps: {
          sx: {
            zIndex: 1300,
          },
        },
      },
    },
    typography: {
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
  });

  const renderExerciseModalRoutes = () => (
    <Route path="workouts/:workoutId" element={<WorkoutPage />}>
      <Route path="exercises" element={<ExercisesPage />}>
        <Route path=":exerciseId" element={<ExerciseForm />} />
      </Route>
    </Route>
  );
  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/profile" />} />
              <Route path="profile" element={<ProfilePage />}>
                <Route path="settings" element={<SettingsPage />} />
                <Route path="measurements" element={<MeasurementPage />}>
                  <Route path="add" element={<AddMeasurementModal />} />
                  <Route path=":measurementId/point" element={<AddMeasurementPointModal />} />
                </Route>
                {renderExerciseModalRoutes()}
              </Route>
              <Route path="history" element={<HistoryPage />}>
                {renderExerciseModalRoutes()}
              </Route>
              <Route path="training" element={<TrainingPage />}>
                <Route path="workouts/add" element={<AddWorkoutModal />} />
                <Route path="workouts/:workoutId/start" element={<StartWorkoutModal />} />
                {renderExerciseModalRoutes()}
              </Route>
              <Route path="exercises" element={<ExercisesPage />}>
                <Route path=":exerciseId" element={<ExerciseForm />} />
                {renderExerciseModalRoutes()}
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default Router;
