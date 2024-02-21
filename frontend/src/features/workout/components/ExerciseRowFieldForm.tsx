import { TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { digitalTimerToMilliseconds, formatTime } from 'src/hooks/useTimer';

interface ExerciseRowFieldProps {
  val: number | undefined;
  onBlur: (arg0: number | undefined) => void;
  type?: 'time' | 'number';
}

function ExerciseRowFieldForm(props: ExerciseRowFieldProps) {
  const { val, onBlur, type = 'number' } = props;

  const [input, setInput] = React.useState<string>('');

  useEffect(() => {
    let input = val ? String(val) : '';
    if (val && type === 'time') {
      input = formatTime(val, 'digital');
    }

    setInput(input);
  }, [val, type]);

  const removeNonNumber = (newInput: string) => {
    return newInput.replace(/\D/g, '').replace(/^0+/, '');
  };

  const cleanFieldInput = (newInput: string) => {
    if (type === 'time') {
      const numbers = removeNonNumber(newInput.replace(':', '')).padStart(4, '0').split('');
      if (numbers.length == 4) {
        numbers.splice(2, 0, ':');
      } else {
        numbers.splice(numbers.length - 2, 0, ':');
        numbers.splice(numbers.length - 5, 0, ':');
      }

      return numbers.join('');
    }

    return removeNonNumber(newInput);
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
      inputMode="none"
      value={input}
      onChange={(e) => setInput(cleanFieldInput(e.target.value))}
      onFocus={(e) => e.target.select()}
      onBlur={() => {
        if (type === 'time') {
          onBlur(digitalTimerToMilliseconds(input));
        } else {
          onBlur(input ? Number(input) : undefined);
        }
      }}
    />
  );
}

const ExerciseRowFieldFormMemo = React.memo(ExerciseRowFieldForm);
export default ExerciseRowFieldFormMemo;
