import { Stack, TextField, Button } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { ProgramResponse, WorkoutType } from 'features/workout/types';
import AppHeader from 'components/AppHeader';
import Section from 'components/Section';
import WorkoutCard from 'features/workout/components/WorkoutCard';
import AppContainer from 'components/AppContainer';

const PROGRAM: ProgramResponse = {
  id: 1,
  name: 'program name',
  description: 'Description',
  weeks: [
    {
      id: 1,
      workouts: [
        {
          id: 1,
          name: 'Workout test',
          note: '',
          exerciseGroups: [],
          type: WorkoutType.Template,
          startDate: '',
          endDate: '',
        },
      ],
    },
    {
      id: 1,
      workouts: [
        {
          id: 1,
          name: 'Workout test',
          note: '',
          exerciseGroups: [],
          type: WorkoutType.Template,
          startDate: '',
          endDate: '',
        },
      ],
    },
  ],
};

function ProgramPageHeader() {
  return <AppHeader title="Program" />;
}

function ProgramPage() {
  const program = PROGRAM;

  return (
    <AppContainer header={<ProgramPageHeader />}>
      <Stack spacing={1}>
        <TextField size="small" label="Program title" />
        <TextField size="small" rows={3} multiline label="Program description" />
        {program.weeks.map((week, i) => (
          <Section
            title={`Week ${i + 1}`}
            collapse
            rightNode={
              <Button variant="outlined" sx={{ height: 20, p: 0, minWidth: 0 }}>
                <MoreHoriz />
              </Button>
            }
          >
            {week.workouts.map((workout) => (
              <WorkoutCard workout={workout} />
            ))}
          </Section>
        ))}
        <Button>Add week</Button>
      </Stack>
    </AppContainer>
  );
}

export default ProgramPage;
