import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { monkeylogApi } from '../services/monkeylogApi';

const store = configureStore({
  reducer: {
    [monkeylogApi.reducerPath]: monkeylogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(monkeylogApi.middleware),
});

setupListeners(store.dispatch);

export default store;
