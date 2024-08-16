import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material';
import useForm from 'src/hooks/useForm';

function ModalForm<Form extends Record<string, string | number>>(props: {
  open: boolean;
  onClose: () => void;
  onTransitionExited?: () => void;
  title: string;
  initialState: Form;
  renderOptions: {
    label: string;
    disabled?: boolean;
    key: keyof Form;
    options?: { value: Form[keyof Form]; label: string }[];
  }[];
  onSubmit: (form: Form) => Promise<unknown> | void;
}) {
  const { title, open, onClose, initialState, renderOptions, onSubmit, onTransitionExited } = props;
  const { data: formState, update } = useForm(initialState);

  return (
    <Dialog open={open} onClose={onClose} onTransitionExited={onTransitionExited}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Stack>
          {renderOptions.map(({ options, label, key, disabled }) =>
            options ? (
              <FormControl key={label} size="small" margin="normal">
                <InputLabel id={label}>{label}</InputLabel>
                <Select
                  label={label}
                  disabled={disabled}
                  labelId={String(key)}
                  value={formState[key]}
                  onChange={(e) => update(key, e.target.value as Form[keyof Form])}
                >
                  {options.map((et) => (
                    <MenuItem key={et.label} value={et.value}>
                      {et.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <TextField
                key={label}
                label={label}
                size="small"
                margin="dense"
                disabled={disabled}
                inputMode={typeof formState[key] === 'number' ? 'numeric' : 'text'}
                type={typeof formState[key] === 'number' ? 'number' : 'text'}
                value={formState[key]}
                onChange={(e) =>
                  update(
                    key,
                    (typeof formState[key] === 'number'
                      ? Number(e.target.value)
                      : e.target.value) as Form[keyof Form]
                  )
                }
              />
            )
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSubmit(formState)?.then(onClose)}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModalForm;
