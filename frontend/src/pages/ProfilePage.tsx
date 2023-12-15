import { Settings } from '@mui/icons-material';
import { Button, Grid, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import AppContainer from 'src/components/AppContainer';
import { useNavigate } from 'react-router-dom';
import { ModalOutlet } from 'src/components/ModalOutlet';
import AppCard from 'src/components/AppCard';
import { BarChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import { useGetWorkoutFrequencyQuery, useGetWorkoutStatisticsQuery } from 'src/store/monkeylogApi';

function ProfileSummaryTile() {
  const { data: summary } = useGetWorkoutStatisticsQuery();

  const Simple = (props: { description: string; stat: string }) => (
    <Grid item xs={4}>
      <Stack direction="column">
        <Typography textAlign="center" fontSize={14} color="text.secondary">
          {props.description}
        </Typography>
        <Typography textAlign="center" fontSize={14} fontWeight="700">
          {props.stat}
        </Typography>
      </Stack>
    </Grid>
  );

  return (
    <Paper variant="outlined" sx={{ p: 1 }}>
      <Grid container>
        <Simple stat={summary?.totalWorkouts.toString() ?? ''} description="Workouts" />
        <Simple stat={summary?.totalVolume.toLocaleString() ?? ''} description="Lifted (kg)" />
        <Simple stat={((summary?.totalTime ?? 0) / 3600).toLocaleString()} description="Hours" />
      </Grid>
    </Paper>
  );
}

function FrequencyTile() {
  const { data: frequency } = useGetWorkoutFrequencyQuery();

  console.log(frequency);

  const theme = useTheme();

  const everyMonthInYear = Array.from({ length: 6 }, (_, i) => i + 1);
  const everyMonthInYearFormatted = everyMonthInYear.map((month) =>
    dayjs().month(month).format('MMM')
  );

  return (
    <AppCard header="Workouts Per Month" subheader="Activity">
      <BarChart
        xAxis={[{ scaleType: 'band', data: everyMonthInYearFormatted }]}
        series={[{ data: everyMonthInYear, color: theme.palette.primary.main }]}
        margin={{ left: 30, top: 10, right: 10, bottom: 24 }}
        height={120}
      />
    </AppCard>
  );
}

function ProfilePage() {
  const navigate = useNavigate();

  const renderGridButton = (text: string, onClick: () => void) => (
    <Grid item xs={6} sm={3}>
      <Button variant="outlined" onClick={onClick} fullWidth>
        {text}
      </Button>
    </Grid>
  );

  return (
    <AppContainer
      header={{
        title: 'Tom den Boon',
        rightButton: (
          <IconButton onClick={() => navigate('settings')} color="inherit">
            <Settings color="inherit" />
          </IconButton>
        ),
      }}
    >
      <Grid container spacing={2}>
        <Grid item container spacing={1}>
          {renderGridButton('History', () => navigate('history'))}
          {renderGridButton('Exercises', () => navigate('exercises'))}
          {renderGridButton('Statistics', () => navigate('statistics'))}
          {renderGridButton('Measures', () => navigate('measurements'))}
        </Grid>
        <Grid item xs={12}>
          <ProfileSummaryTile />
        </Grid>
        <Grid item xs={12} md={4}>
          <FrequencyTile />
        </Grid>
      </Grid>
      <ModalOutlet />
    </AppContainer>
  );
}

export default ProfilePage;
