import { Dialog, Grid, IconButton, Stack } from '@mui/material';
import { CalendarIcon, DateCalendar, PickersDay, PickersDayProps } from '@mui/x-date-pickers';
import AppContainer from 'components/AppContainer';
import AppHeader from 'components/AppHeader';
import Section from 'components/Section';
import dayjs, { Dayjs } from 'dayjs';
import WorkoutCompleteCard from 'features/workout/components/WorkoutCompleteCard';
import useModal from 'hooks/useModal';
import { useState } from 'react';
import { WorkoutFullResponse, useGetWorkoutsQuery } from 'store/monkeylogApi';

const FORMAT = 'YYYY-MM-DD';

function ServerDay(props: PickersDayProps<Dayjs> & { highlightedDays?: String[] }) {
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

function Profile() {
  const calendarModal = useModal();
  const [date, setDate] = useState<Dayjs | null>();
  const { data: pageWorkout } = useGetWorkoutsQuery({
    type: 'COMPLETED',
    size: 20,
    after: date?.format('YYYY-MM-DDT00:00:00'),
  });

  const monthGrouped = pageWorkout?.content.reduce((acc, val) => {
    const month = dayjs(val.endDate).format('MMMM YYYY');
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(val);
    return acc;
  }, {} as Record<string, WorkoutFullResponse[]>);

  return (
    <AppContainer
      header={
        <AppHeader
          title="Profile"
          RightButton={
            <IconButton onClick={calendarModal.open} color="inherit">
              <CalendarIcon color="inherit" />
            </IconButton>
          }
        />
      }
    >
      {pageWorkout && pageWorkout.content.length > 0 && (
        <Dialog open={calendarModal.isOpen} onClose={calendarModal.close}>
          <DateCalendar
            loading={false}
            value={date}
            maxDate={dayjs(pageWorkout.content[pageWorkout.content.length - 1].endDate)}
            minDate={dayjs(pageWorkout.content[0].endDate)}
            slots={{ day: ServerDay }}
            slotProps={{
              day: {
                highlightedDays: pageWorkout.content.map((val) =>
                  dayjs(val.endDate).format(FORMAT)
                ),
              } as any,
            }}
            onChange={(d) => {
              setDate(d);
              calendarModal.close();
            }}
          />
        </Dialog>
      )}

      <Stack spacing={1}>
        {Object.entries(monthGrouped ?? {}).map(([month, workouts]) => (
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
    </AppContainer>
  );
}

export default Profile;
