import { Dialog, Grid, IconButton, Stack } from '@mui/material';
import { CalendarIcon, DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import Section from 'src/components/Section';
import dayjs, { Dayjs } from 'dayjs';
import WorkoutCompleteCard from 'src/features/workout/components/WorkoutCompleteCard';
import useModal from 'src/hooks/useModal';
import { useState } from 'react';
import {
  WorkoutFullResponse,
  useGetWorkoutFrequencyQuery,
  useGetWorkoutsQuery,
} from 'src/store/workoutLogbookApi';
import { ModalOutlet, useModalOutletContext } from 'src/components/ModalOutlet';
import FullScreenModal from 'src/components/FullScreenModal';

const FORMAT = 'YYYY-MM-DD';

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: string[] }) {
  const { highlightedDays, day, ...other } = props;

  const isSelected = !!highlightedDays?.find((val) => val === day.format(FORMAT));

  return (
    <PickersDay
      {...other}
      selected={isSelected}
      disabled={!isSelected}
      disableHighlightToday
      day={day}
    />
  );
}

function HistoryPage() {
  const calendarModal = useModal();
  const [date, setDate] = useState<Dayjs | null>();
  const { modalControls } = useModalOutletContext();
  const { data: frequency } = useGetWorkoutFrequencyQuery({ interval: 'DAY' });
  const months = frequency?.map((val) => dayjs(val.date)) ?? [];

  const { data: workouts } = useGetWorkoutsQuery({
    workoutType: 'COMPLETED',
    size: 9,
    sort: ['startDate', 'DESC'],
  });

  const monthGrouped = workouts?.content.reduce((acc, val) => {
    const month = dayjs(val.endDate).format('MMMM YYYY');

    if (!acc[month]) {
      acc[month] = [];
    }

    acc[month].push(val);

    return acc;
  }, {} as Record<string, WorkoutFullResponse[]>);

  return (
    <FullScreenModal
      {...modalControls}
      header={{
        title: 'History',
        rightButton: (
          <IconButton onClick={() => calendarModal.open()} color="inherit">
            <CalendarIcon color="inherit" />
          </IconButton>
        ),
      }}
    >
      {workouts && workouts.content.length > 0 && (
        <Dialog open={calendarModal.isOpen} onClose={calendarModal.close}>
          <DateCalendar
            loading={false}
            value={date}
            maxDate={months[months.length - 1]}
            minDate={months[0]}
            slots={{ day: ServerDay }}
            slotProps={{
              day: {
                highlightedDays: months.map((m) => m.format(FORMAT)),
              } as any,
            }}
            onChange={(d) => {
              setDate(d);
              // calendarModal.close();
            }}
          />
        </Dialog>
      )}
      <Stack spacing={4}>
        {Object.entries(monthGrouped ?? {})
          .sort(([a], [b]) => dayjs(b).unix() - dayjs(a).unix())
          .map(([month, workouts]) => (
            <Section title={month} key={month}>
              <Grid container spacing={1}>
                {workouts.map((val) => (
                  <Grid item xs={12} sm={6} md={4} key={val.id}>
                    <WorkoutCompleteCard workout={val} />
                  </Grid>
                ))}
              </Grid>
            </Section>
          ))}
      </Stack>
      <ModalOutlet />
    </FullScreenModal>
  );
}

export default HistoryPage;
