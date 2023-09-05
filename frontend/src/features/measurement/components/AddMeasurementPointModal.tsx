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
import { MeasurementPointCreateRequest } from 'store/baseMonkeylogApi';
import { useCreateMeasurementPointMutation } from 'store/monkeylogApi';

export default function AddMeasurementPointModal(props: IUseModal & { measurementId: string }) {
  const { measurementId, isOpen, close } = props;
  const { data: measurementForm, update } = useForm<MeasurementPointCreateRequest>({
    value: 0,
  });
  const [addMeasurementPoint] = useCreateMeasurementPointMutation();

  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>Add measurement point</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          size="small"
          margin="dense"
          value={measurementForm.value}
          type="number"
          onChange={(e) => update('value', Number(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() =>
            addMeasurementPoint({
              id: measurementId,
              measurementPointCreateRequest: measurementForm,
            })
              .unwrap()
              .then(close)
          }
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
