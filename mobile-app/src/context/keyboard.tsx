import { ExerciseField } from 'db/types';
import { EventEmitter } from 'expo';
import { useEffect } from 'react';

type KeyboardEmitter = {
  focusExerciseField: (id: string) => void;
  focusKeyboard: (field?: ExerciseField) => void;
  onKeyPress: (digit: string) => void;
  onBlur: () => void;
  onNext: () => void;
};

export const keyboardEmitter = new EventEmitter<KeyboardEmitter>();

export const useKeyboardEvent = (
  event: keyof KeyboardEmitter,
  callback: KeyboardEmitter[typeof event],
  enabled = true,
) => {
  useEffect(() => {
    if (enabled) {
      keyboardEmitter.addListener(event, callback);
    }

    return () => {
      keyboardEmitter.removeListener(event, callback);
    };
  }, [event, callback, enabled]);
};
