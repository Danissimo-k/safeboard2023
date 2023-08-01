import { createSlice } from '@reduxjs/toolkit';
import { initialState, usersAdapter } from './state';
import {addMoreUsers, fetchUsers, fetchWithGroupOnly} from './dispatchers';

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  /**
   * Add async reducers.
   * @param builder Builder.
   */
  extraReducers: builder => builder
    .addCase(fetchUsers.pending, state => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      state.currentPage = action.payload.page;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      usersAdapter.setAll(state, action.payload.items);
    })
    .addCase(fetchUsers.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    })
    .addCase(addMoreUsers.pending, state => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(addMoreUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      state.currentPage = action.payload.page;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
      usersAdapter.addMany(state, action.payload.items);
    })
    .addCase(addMoreUsers.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    })
    .addCase(fetchWithGroupOnly.pending, state => {
      state.isLoading = true;
      state.error = undefined;
    })
    .addCase(fetchWithGroupOnly.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      usersAdapter.setAll(state, action.payload);
    })
    .addCase(fetchWithGroupOnly.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    })
  ,

});
