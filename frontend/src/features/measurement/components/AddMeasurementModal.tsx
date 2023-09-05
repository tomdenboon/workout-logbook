import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';
import useForm from 'hooks/useForm';
import { IUseModal } from 'hooks/useModal';
import { MeasurementCreateRequest } from 'store/baseMonkeylogApi';
import { useCreateMeasurementMutation } from 'store/monkeylogApi';

export default function AddMeasurementModal(props: IUseModal) {
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
          size="small"
          margin="dense"
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
