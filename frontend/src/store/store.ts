import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import emptyWorkoutLogbookApi from 'src/store/emptyWorkoutLogbookApi';
import timerSlice from 'src/store/timerSlice';

const store = configureStore({
  reducer: {
    [emptyWorkoutLogbookApi.reducerPath]: emptyWorkoutLogbookApi.reducer,
    timer: timerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(emptyWorkoutLogbookApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
