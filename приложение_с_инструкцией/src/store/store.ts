import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook, useDispatch, useSelector,
} from 'react-redux';
import { usersSlice } from './users/slice';
import { groupsSlice } from './groups/slice';
import { dataViewSlice } from './dataView/slice';

// import { postsSlice } from './post/slice';

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
    groups: groupsSlice.reducer,
    dataView: dataViewSlice.reducer,
  },

  /**
   * Init middleware.
   * @param getDefaultMiddleware Func to init config.
   */
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Typed `useDispatch` hook. */
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
