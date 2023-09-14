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
  });

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Navigate to="/profile" />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route
                path="profile/settings"
                element={<ProfilePage modal="settings" />}
              />
              <Route
                path="profile/measurements"
                element={<ProfilePage modal="measurements" />}
              />
              <Route path="history" element={<HistoryPage />} />
              <Route path="training" element={<TrainingPage />} />
              <Route path="exercises" element={<ExercisesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default Router;
