import { Scale, Settings } from '@mui/icons-material';
import { Grid, IconButton, Stack, useTheme } from '@mui/material';
import AppContainer from 'src/components/AppContainer';
import { useNavigate } from 'react-router-dom';
import { ModalOutlet } from 'src/components/ModalOutlet';
import AppCard from 'src/components/AppCard';
import { BarChart } from '@mui/x-charts';
import dayjs from 'dayjs';

function ProfilePage() {
  const navigate = useNavigate();

  const theme = useTheme();

  const everyMonthInYear = Array.from({ length: 6 }, (_, i) => i + 1);
  const everyMonthInYearFormatted = everyMonthInYear.map((month) =>
    dayjs().month(month).format('MMM')
  );

  return (
    <AppContainer
      header={{
        title: 'Profile',
        rightButton: (
          <Stack direction="row">
            <IconButton onClick={() => navigate('measurements')} color="inherit">
              <Scale color="inherit" />
            </IconButton>
            <IconButton onClick={() => navigate('settings')} color="inherit">
              <Settings color="inherit" />
            </IconButton>
          </Stack>
        ),
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <AppCard header="Workouts Per Month" subheader="Activity">
            <BarChart
              xAxis={[{ scaleType: 'band', data: everyMonthInYearFormatted }]}
              series={[{ data: everyMonthInYear, color: theme.palette.primary.main }]}
              margin={{ left: 30, top: 10, right: 10, bottom: 24 }}
              height={120}
            />
          </AppCard>
        </Grid>
      </Grid>
      <ModalOutlet />
    </AppContainer>
  );
}

export default ProfilePage;
