import { Add } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from '@mui/material';
import AppContainer from 'components/AppContainer';
import AppHeader from 'components/AppHeader';
import MeasurementCard from 'features/measurement/components/MeasurementCard';
import useForm from 'hooks/useForm';
import useModal, { IUseModal } from 'hooks/useModal';
import {
  useGetMeasurementsQuery,
  useCreateMeasurementMutation,
  MeasurementCreateRequest,
} from 'store/monkeylogApi';

function MeasurementModal(props: IUseModal) {
  const { isOpen, close } = props;
  const { data: measurementForm, update } = useForm<MeasurementCreateRequest>({
    name: '',
    unit: '',
  });
  const [addMeasurement] = useCreateMeasurementMutation();

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Add measurement</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={measurementForm.name}
          onChange={(e) => update('name', e.target.value)}
        />
        <TextField
          label="Unit"
          value={measurementForm.unit}
          onChange={(e) => update('unit', e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            addMeasurement({ measurementCreateRequest: measurementForm }).unwrap().then(close)
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function Statistics() {
  const { data } = useGetMeasurementsQuery();
  const measurementModal = useModal();

  return (
    <AppContainer
      header={
        <AppHeader
          RightButton={
            <IconButton onClick={measurementModal.open} color="inherit">
              <Add />
            </IconButton>
          }
          title="Measurements"
        />
      }
    >
      <Grid container spacing={2}>
        {data?.map((measurement) => (
          <Grid item xs={12} md={6}>
            <MeasurementCard key={measurement.id} measurement={measurement} />
          </Grid>
        ))}
      </Grid>
      {measurementModal.isOpen && <MeasurementModal {...measurementModal} />}
    </AppContainer>
  );
}

export default Statistics;
