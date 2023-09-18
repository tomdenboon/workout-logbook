import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { METRIC_FORMATS, METRIC_FORMAT_NICE } from 'src/features/measurement/types';
import useForm from 'src/hooks/useForm';
import { IUseModal } from 'src/hooks/useModal';
import { MeasurementCreateRequest } from 'src/store/baseMonkeylogApi';
import { useCreateMeasurementMutation } from 'src/store/monkeylogApi';

export default function AddMeasurementModal(props: IUseModal) {
  const { isOpen, close } = props;
  const { data: measurementForm, update } = useForm<MeasurementCreateRequest>({
    name: '',
    metric: 'WEIGHT',
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
        <FormControl size="small">
          <InputLabel id="metric_format_label">Type</InputLabel>
          <Select
            label="Type"
            labelId="metric_format_label"
            value={measurementForm.metric}
            onChange={(e) => update('metric', e.target.value as (typeof measurementForm)['metric'])}
          >
            {METRIC_FORMATS.map((et) => (
              <MenuItem key={et} value={et}>
                {METRIC_FORMAT_NICE[et]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
