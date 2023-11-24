import { TextField } from '@mui/material';
import React from 'react';

interface ExerciseRowFieldProps {
  val: number | undefined;
  setVal: (val: number | undefined) => void;
  onBlur: () => void;
}

function ExerciseRowFieldForm(props: ExerciseRowFieldProps) {
  const { val, setVal, onBlur } = props;

  const cleanFieldInput = (newInput: string) => {
    // also clear trim 0's in front of string
    const x = newInput.replace(/\D/g, '').replace(/^0+/, '');
    return x ? Number(x) : undefined;
  };

  return (
    <TextField
      sx={{
        '& .MuiInputBase-root': {
          '& input': {
            textAlign: 'center',
          },
          height: 24,
        },
      }}
      fullWidth
      hiddenLabel
      value={val ?? ''}
      onChange={(e) => setVal(cleanFieldInput(e.target.value))}
      onFocus={(e) => e.target.select()}
      onBlur={onBlur}
    />
  );
}

const ExerciseRowFieldFormMemo = React.memo(ExerciseRowFieldForm);
export default ExerciseRowFieldFormMemo;
