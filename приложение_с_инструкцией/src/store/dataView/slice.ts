import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, DataView, SortDirection } from './state';
import { UserDto } from '../../api/dtos/userDto';

export const dataViewSlice = createSlice({
  name: 'dataView',
  initialState,
  reducers: {
    changeDataView(state, action: PayloadAction<DataView>) {
      state.currentDataView = action.payload;
    },
    changeSortField(state, action: PayloadAction<keyof UserDto>) {
      state.sortField = action.payload;
    },
    changeSortDirection(state, action: PayloadAction<SortDirection>) {
      state.sortDirection = action.payload;
    },
    changeSearchString(state, action: PayloadAction<string>) {
      state.searchString = action.payload;
    },
  },
});

export const { changeDataView, changeSortField, changeSortDirection, changeSearchString } = dataViewSlice.actions;
