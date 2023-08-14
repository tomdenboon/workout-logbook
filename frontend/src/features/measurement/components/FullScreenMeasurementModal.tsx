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

import FullScreenModal from 'components/FullScreenModal';
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
    metricFormat: 'WEIGHT',
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
        {/* <TextField
          label="Unit"
          value={measurementForm.unit}
          onChange={(e) => update('unit', e.target.value)}
        /> */}
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

function FullScreenMeasurementModal(props: IUseModal) {
  const { isOpen, close } = props;
  const { data } = useGetMeasurementsQuery();
  const measurementModal = useModal();

  return (
    <FullScreenModal
      header={{
        title: 'Measurements',
        rightButton: (
          <IconButton onClick={measurementModal.open} color="inherit">
            <Add />
          </IconButton>
        ),
      }}
      isOpen={isOpen}
      close={close}
    >
      <Grid container spacing={2}>
        {data?.map((measurement) => (
          <Grid item xs={12} md={6}>
            <MeasurementCard key={measurement.id} measurement={measurement} />
          </Grid>
        ))}
      </Grid>
      {measurementModal.isOpen && <MeasurementModal {...measurementModal} />}
    </FullScreenModal>
  );
}

export default FullScreenMeasurementModal;
