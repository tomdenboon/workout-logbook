import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'src/store/store';

// Define a type for the slice state
interface CounterState {
  milliseconds: number;
  startTime: number;
  endTime: number;
}

// Define the initial state using that type
const initialState: CounterState = {
  milliseconds: 0,
  startTime: Date.now(),
  endTime: Date.now(),
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    start: (state, action: PayloadAction<number>) => {
      state.milliseconds = action.payload;
      state.startTime = Date.now();
    },
    clear: (state) => {
      state.milliseconds = 0;
      state.startTime = Date.now();
    },
  },
});

export const { start, clear } = timerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const getWorkoutTimerState = (state: RootState) => {
  return {
    ...state.timer,
    endTime: state.timer.startTime + state.timer.milliseconds,
  };
};

export default timerSlice.reducer;
