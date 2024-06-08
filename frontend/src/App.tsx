import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Provider } from 'react-redux';
import store from 'src/store/store.ts';
import Router from 'src/routes/Router';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

export default function App() {
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

  return (
    <Provider store={store}>
      <ThemeProvider theme={mdTheme}>
        <CssBaseline />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Router />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}
