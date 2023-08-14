import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ExercisesPage from 'pages/ExercisesPage';
import HistoryPage from 'pages/HistoryPage';
import ProgramPage from 'pages/ProgramPage';
import TrainingPage from 'pages/TrainingPage';
import AppLayout from 'layouts/AppLayout';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ProfilePage from 'pages/ProfilePage';

function Router() {
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
              <Route path="history" element={<HistoryPage />} />
              <Route path="training" element={<TrainingPage />} />
              <Route path="training/programs/:id" element={<ProgramPage />} />
              <Route path="exercises" element={<ExercisesPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default Router;
