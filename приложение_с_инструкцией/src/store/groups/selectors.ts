import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { groupEntityAdapter } from './state';

export const selectGroupsLoading = createSelector(
  (state: RootState) => state.groups.isLoading,
  isLoading => isLoading,
);

export const selectGroupsTotalQuantity = createSelector(
  (state: RootState) => state.groups.totalItems,
  totalItems => totalItems,
);

export const selectGroupsTotalPagesQuantity = createSelector(
  (state: RootState) => state.groups.totalPages,
  totalPages => totalPages,
);

export const selectGroupsCurrentPage = createSelector(
  (state: RootState) => state.groups.currentPage,
  currentPage => currentPage,
);

export const selectGroupsPerPage = createSelector(
  (state: RootState) => state.groups.perPage,
  perPage => perPage,
);

export const {
  /** Select all groups. */
  selectAll: selectAllGroups,

  /** Select group by id. */
  selectById: selectGroupById,
} = groupEntityAdapter.getSelectors<RootState>(state => state.groups);


// Need for complex selectors
export const {
  /** Select group by id. */
  selectById: selectGroupByIdForCombinedSelectors,
} = groupEntityAdapter.getSelectors();
