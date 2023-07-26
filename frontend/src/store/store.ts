import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import emptyMonkeylogApi from 'store/emptyMonkeylogApi';

const store = configureStore({
  reducer: {
    [emptyMonkeylogApi.reducerPath]: emptyMonkeylogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(emptyMonkeylogApi.middleware),
});

setupListeners(store.dispatch);

export default store;
