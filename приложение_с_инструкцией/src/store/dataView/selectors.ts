import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectCurrentDataView = createSelector(
  (state: RootState) => state.dataView.currentDataView,
  currentDataView => currentDataView,
);

export const selectCurrentSortField = createSelector(
  (state: RootState) => state.dataView.sortField,
  sortField => sortField,
);

export const selectCurrentSortDirection = createSelector(
  (state: RootState) => state.dataView.sortDirection,
  sortDirection => sortDirection,
);

export const selectSearchSting = createSelector(
  (state: RootState) => state.dataView.searchString,
  searchString => searchString,
);
