import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import emptyMonkeylogApi from 'src/store/emptyMonkeylogApi';
import timerSlice from 'src/store/timerSlice';

const store = configureStore({
  reducer: {
    [emptyMonkeylogApi.reducerPath]: emptyMonkeylogApi.reducer,
    timer: timerSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emptyMonkeylogApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
