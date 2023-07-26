import { Stack, TextField } from '@mui/material';
import AppHeader from 'components/AppHeader';
import AppContainer from 'components/AppContainer';

function ProgramPageHeader() {
  return <AppHeader title="Program" />;
}

function ProgramPage() {
  return (
    <AppContainer header={<ProgramPageHeader />}>
      <Stack spacing={1}>
        <TextField size="small" label="Program title" />
        <TextField size="small" rows={3} multiline label="Program description" />
        {/* {program.weeks.map((week, i) => (
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
              <WorkoutCard onClick={() => null} workout={workout} />
            ))}
          </Section>
        ))}
        <Button>Add week</Button> */}
      </Stack>
    </AppContainer>
  );
}

export default ProgramPage;
