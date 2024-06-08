import { Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';
import {
  ExerciseResponse,
  GetStatisticsArg,
  useGetExerciseCategoriesQuery,
  useGetExerciseGroupsQuery,
  useGetExerciseQuery,
  useGetStatisticsQuery,
} from 'src/store/monkeylogApi';
import AppCard from 'src/components/AppCard';
import { LineChart } from '@mui/x-charts';
import dayjs from 'dayjs';
import { useModalOutletContext } from 'src/components/ModalOutlet';
import Section from 'src/components/Section';
import FullScreenModal from 'src/components/FullScreenModal';
import formatExercise from 'src/features/workout/utils/fomatExercise';

function ExerciseStatisticCard(props: GetStatisticsArg & { label: string }) {
  const { data: exercise } = useGetExerciseQuery({ id: props.id });
  const { data } = useGetStatisticsQuery(props);
  const theme = useTheme();

  const stats = data ?? [];
  const xAxis = stats.map((point) => new Date(point.date));
  const seriesData = stats.map((point) => point.value);

  return (
    <AppCard header={exercise?.name ?? ''} subheader={props.label}>
      {xAxis.length >= 1 && (
        <LineChart
          xAxis={[
            {
              min: dayjs().subtract(3, 'month').toDate(),
              max: dayjs().toDate(),
              data: xAxis,
              scaleType: 'time',
              tickNumber: 3,
            },
          ]}
          series={[
            {
              color: theme.palette.primary.main,
              data: seriesData,
            },
          ]}
          margin={{ left: 30, top: 10, right: 10, bottom: 24 }}
          height={120}
        />
      )}
    </AppCard>
  );
}

function ExerciseHistory(props: { exercise: ExerciseResponse }) {
  const { exercise } = props;
  const { data } = useGetExerciseGroupsQuery({
    exerciseId: exercise.id,
    size: 9,
    sort: ['workout.startDate', 'DESC'],
  });
  const { data: categories } = useGetExerciseCategoriesQuery();

  return data?.content.map(({ id, workout, exerciseRows }) => (
    <Grid key={id} xs={12} sm={4} item>
      <AppCard
        key={id}
        header={workout.name}
        subheader={new Date(workout?.startDate ?? '').toLocaleString()}
      >
        <Typography fontWeight="700">Sets performed</Typography>
        {exerciseRows.map((exerciseRow) => (
          <Typography>
            {categories &&
              formatExercise(categories[exercise.exerciseCategory].validFields, exerciseRow)}
          </Typography>
        ))}
      </AppCard>
    </Grid>
  ));
}

const STATISTICS_VARIANTS: Record<
  ExerciseResponse['exerciseCategory'],
  (Omit<GetStatisticsArg, 'id'> & { label: string })[]
> = {
  REPS: [
    {
      aggregate: 'MAX',
      label: 'Max reps',
      type: 'REPS',
    },
    {
      aggregate: 'SUM',
      label: 'Total reps',
      type: 'REPS',
    },
  ],
  DISTANCE: [
    {
      aggregate: 'SUM',
      label: 'Total time',
      type: 'TIME',
    },
    {
      aggregate: 'SUM',
      label: 'Total distance',
      type: 'DISTANCE',
    },
  ],
  DURATION: [
    {
      aggregate: 'SUM',
      label: 'Total time',
      type: 'TIME',
    },
  ],
  WEIGHTED: [
    {
      aggregate: 'MAX',
      label: 'Max weight',
      type: 'WEIGHT',
    },
    {
      aggregate: 'MAX',
      label: 'Max 1rm progression',
      type: 'ONE_RM',
      distinct: true,
    },
    {
      aggregate: 'SUM',
      label: 'Total volume',
      type: 'VOLUME',
    },
    {
      aggregate: 'SUM',
      label: 'Total reps',
      type: 'REPS',
    },
  ],
};

function Exercise() {
  const { exerciseId } = useParams();
  const { data: exercise } = useGetExerciseQuery({ id: exerciseId ?? '' });
  const { modalControls } = useModalOutletContext();

  return !exercise ? null : (
    <FullScreenModal header={{ title: exercise.name }} {...modalControls}>
      <Stack spacing={4}>
        <Section title="Statistics">
          <Grid container spacing={2}>
            {STATISTICS_VARIANTS[exercise.exerciseCategory].map((q) => (
              <Grid xs={12} md={6} item>
                <ExerciseStatisticCard id={exercise.id} {...q} />
              </Grid>
            ))}
          </Grid>
        </Section>
        <Section title="History">
          <Grid container spacing={2}>
            <ExerciseHistory exercise={exercise} />
          </Grid>
        </Section>
        <Button>Load More</Button>
      </Stack>
    </FullScreenModal>
  );
}

export default Exercise;
