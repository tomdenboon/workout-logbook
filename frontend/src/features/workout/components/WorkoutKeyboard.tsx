import { Paper, Container, Grid, Button } from '@mui/material';
import { createContext, useCallback, useState } from 'react';
import getExerciseFields from 'src/features/workout/utils/getExerciseFields';
import {
  GetExerciseCategoriesResponse,
  WorkoutFullResponse,
} from 'src/store/baseWorkoutLogbookApi';

const KEYBOARD_INPUTS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'back'];

export const WorkoutKeyboardContext = createContext<
  Omit<ReturnType<typeof useWorkoutKeyboard>, 'next' | 'isOpen' | 'setInput'>
>({
  connectKeyboard: (exerciseRowId: string, exerciseRowType: string) => {
    exerciseRowId;
    exerciseRowType;
  },
  disconnectKeyboard: () => {},
  exerciseRowId: '',
  exerciseRowType: '',
});

export function useWorkoutKeyboard(
  workout?: WorkoutFullResponse,
  categories?: GetExerciseCategoriesResponse
) {
  const [exerciseRowId, setExerciseRowId] = useState('');
  const [exerciseRowType, setExerciseRowType] = useState('');
  const [setInput, setSetInput] = useState<(input: string) => void>();
  const [onNext, setOnNext] = useState<() => void>();

  const reset = () => {
    setExerciseRowId('');
    setExerciseRowType('');
    setSetInput(undefined);
  };

  const next = () => {
    if (!workout || !categories) {
      return reset();
    }

    const i = workout.exerciseGroups.findIndex((e) =>
      e.exerciseRows.some((r) => r.id === exerciseRowId)
    );

    if (i === -1) return reset();

    const j = workout.exerciseGroups[i].exerciseRows.findIndex((e) => e.id === exerciseRowId);

    if (j === -1) return reset();

    const k = getExerciseFields(workout.exerciseGroups[i], categories).findIndex(
      (e) => e === exerciseRowType
    );

    if (k === -1) return reset();

    if (k + 1 < getExerciseFields(workout.exerciseGroups[i], categories).length) {
      setExerciseRowId(workout.exerciseGroups[i].exerciseRows[j].id);
      setExerciseRowType(getExerciseFields(workout.exerciseGroups[i], categories)[k + 1]);
    } else if (j + 1 < workout.exerciseGroups[i].exerciseRows.length) {
      setExerciseRowId(workout.exerciseGroups[i].exerciseRows[j + 1].id);
      setExerciseRowType(getExerciseFields(workout.exerciseGroups[i], categories)[0]);
      onNext?.();
    } else if (i + 1 < workout.exerciseGroups.length) {
      setExerciseRowId(workout.exerciseGroups[i + 1].exerciseRows[0].id);
      setExerciseRowType(getExerciseFields(workout.exerciseGroups[i + 1], categories)[0]);
      onNext?.();
    } else {
      reset();
      onNext?.();
    }
  };

  const connectKeyboard = useCallback(
    (
      exerciseRowId: string,
      exerciseRowType: string,
      setInput?: (input: string) => void,
      setNext?: () => void
    ) => {
      setExerciseRowId(exerciseRowId);
      setExerciseRowType(exerciseRowType);
      setSetInput(() => setInput);
      setOnNext(() => setNext);
    },
    []
  );

  return {
    next,
    isOpen: setInput !== undefined,
    exerciseRowId,
    exerciseRowType,
    setInput,
    connectKeyboard,
    disconnectKeyboard: reset,
  };
}

interface WorkoutKeyboardProps {
  setInput?: (input: string) => void;
  handleNext: () => void;
}

export default function WorkoutKeyboard({ setInput, handleNext }: WorkoutKeyboardProps) {
  const handleKey = (key: string) => {
    if (key === 'back') {
      return setInput?.('');
    }

    setInput?.(key);
  };

  const keyboardButton = (text: string, onClick: () => void, hidden?: boolean) => {
    return (
      <Button
        variant="outlined"
        sx={{ height: '100%', width: '100%' }}
        onClick={onClick}
        disabled={hidden}
      >
        {text}
      </Button>
    );
  };

  return (
    <div onMouseDown={(e) => e.preventDefault()}>
      <Paper sx={{ py: 2, background: 'primary' }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid container item xs={9} spacing={1}>
              {KEYBOARD_INPUTS.map((keyPress) => (
                <Grid key={keyPress} item xs={4}>
                  {keyboardButton(keyPress, () => handleKey(keyPress))}
                </Grid>
              ))}
            </Grid>
            <Grid container item xs={3} spacing={1}>
              <Grid item xs={12}>
                {keyboardButton('RPE', () => null)}
              </Grid>
              <Grid item xs={12}>
                {keyboardButton('Next', handleNext)}
              </Grid>
              <Grid item xs={12}>
                {keyboardButton('Next', () => null, true)}
              </Grid>
              <Grid item xs={12}>
                {keyboardButton('Hide', () => null)}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </div>
  );
}
