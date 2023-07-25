import { Add } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from '@mui/material';
import AppContainer from 'components/AppContainer';
import AppHeader from 'components/AppHeader';
import Section from 'components/Section';
import MeasurementCard from 'features/measurement/components/MeasurementCard';
import { useState } from 'react';
import { useGetMeasurementsQuery, useAddMeasurementMutation } from 'services/measurementApi';

function Statistics() {
  const { data } = useGetMeasurementsQuery();
  const [addMeasurement] = useAddMeasurementMutation();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppContainer
      header={
        <AppHeader
          RightButton={
            <IconButton onClick={() => setIsOpen(true)} color="inherit">
              <Add />
            </IconButton>
          }
          title="Statistics"
        />
      }
    >
      <Section title="General Statistics" />
      <Section title="Measurements">
        <Grid container spacing={2}>
          {data?.map((measurement) => (
            <Grid item>
              <MeasurementCard key={measurement.id} measurement={measurement} />
            </Grid>
          ))}
        </Grid>
      </Section>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogTitle>Add measurement</DialogTitle>
        <DialogContent>Test</DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={() => addMeasurement({ name: 'measurement', unit: 'KG' })}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </AppContainer>
  );
}

export default Statistics;
