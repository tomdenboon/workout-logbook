import { Dialog, Grid, IconButton, Stack } from '@mui/material';
import { CalendarIcon, DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import AppContainer from 'src/components/AppContainer';
import Section from 'src/components/Section';
import dayjs, { Dayjs } from 'dayjs';
import WorkoutCompleteCard from 'src/features/workout/components/WorkoutCompleteCard';
import useModal, { ModalType } from 'src/hooks/useModal';
import { useState } from 'react';
import { WorkoutFullResponse, useGetWorkoutsQuery } from 'src/store/monkeylogApi';
import { ModalOutlet } from 'src/components/ModalOutlet';

const FORMAT = 'YYYY-MM-DD';

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: string[] }) {
  const { highlightedDays, day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !outsideCurrentMonth && !!highlightedDays?.find((val) => val === day.format(FORMAT));

  return (
    <PickersDay
      {...other}
      selected={isSelected}
      disabled={!isSelected}
      disableHighlightToday
      outsideCurrentMonth={outsideCurrentMonth}
      day={day}
    />
  );
}

function HistoryPage() {
  const calendarModal = useModal(ModalType.Calendar);
  const [date, setDate] = useState<Dayjs | null>();
  const { data: workouts } = useGetWorkoutsQuery({
    workoutType: 'COMPLETED',
  });

  const monthGrouped = workouts?.reduce((acc, val) => {
    const month = dayjs(val.endDate).format('MMMM YYYY');

    if (!acc[month]) {
      acc[month] = [];
    }

    acc[month].push(val);

    return acc;
  }, {} as Record<string, WorkoutFullResponse[]>);

  return (
    <AppContainer
      header={{
        title: 'History',
        rightButton: (
          <IconButton onClick={() => calendarModal.open()} color="inherit">
            <CalendarIcon color="inherit" />
          </IconButton>
        ),
      }}
    >
      {workouts && workouts.length > 0 && (
        <Dialog open={calendarModal.isOpen} onClose={calendarModal.close}>
          <DateCalendar
            loading={false}
            value={date}
            maxDate={dayjs(workouts[workouts.length - 1].endDate)}
            minDate={dayjs(workouts[0].endDate)}
            slots={{ day: ServerDay }}
            slotProps={{
              day: {
                highlightedDays: workouts.map((val) => dayjs(val.endDate).format(FORMAT)),
              } as any,
            }}
            onChange={(d) => {
              setDate(d);
              // calendarModal.close();
            }}
          />
        </Dialog>
      )}
      <Stack spacing={1}>
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
    </AppContainer>
  );
}

export default HistoryPage;
