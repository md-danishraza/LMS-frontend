
'use client';

import { configureStore,combineReducers } from '@reduxjs/toolkit';
import { api } from './api';
import { Provider } from 'react-redux';

// global reducers
import globalReducer from "@/state";

/* REDUX STORE */
const rootReducer = combineReducers({
  global: globalReducer,
  // add more reducers ...
  [api.reducerPath]: api.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
// create a custom useDispatch hook 
export type AppDispatch = typeof store.dispatch;

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}