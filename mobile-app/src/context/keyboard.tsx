import { ExerciseField } from 'db/types';
import React, { useState } from 'react';
import { TextInput } from 'react-native';

export interface KeyboardData {
  exerciseGroupIndex: number;
  exerciseRowIndex: number;
  fieldIndex: number;
  onChangeText: (value: string) => void;
  inputRef: React.RefObject<TextInput | null>;
}

export const KeyboardContext = React.createContext<{
  keyboardData?: KeyboardData;
  connectKeyboard: (data: KeyboardData) => void;
  onNext: () => void;
  disconnectKeyboard: () => void;
}>({} as any);

export const useKeyboardContext = () => React.useContext(KeyboardContext);
