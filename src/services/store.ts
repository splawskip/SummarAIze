// Redux.
import { configureStore } from '@reduxjs/toolkit';
// APIs/
import { articleApi } from './article';

// Configure Redux store.
const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware),
});

export default store;
