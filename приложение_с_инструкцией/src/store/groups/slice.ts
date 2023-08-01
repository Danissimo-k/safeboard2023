import { createSlice } from '@reduxjs/toolkit';
import { initialState, groupEntityAdapter } from './state';
import {fetchAllGroups, fetchGroups} from './dispatchers';

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},

  /**
   * Add async reducers.
   * @param builder Builder.
   */
  extraReducers: builder => builder

    .addCase(fetchGroups.pending, state => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(fetchGroups.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      state.currentPage = action.payload.page;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      groupEntityAdapter.setAll(state, action.payload.items);
    })
    .addCase(fetchGroups.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    })
    .addCase(fetchAllGroups.pending, state => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(fetchAllGroups.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      groupEntityAdapter.setAll(state, action.payload);
    })
    .addCase(fetchAllGroups.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    })
  ,

});
