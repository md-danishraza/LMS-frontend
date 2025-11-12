
'use client';

import { configureStore,combineReducers } from '@reduxjs/toolkit';
import { api } from './api';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

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

// redux type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// create a custom useDispatch and useSelector hook 
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}