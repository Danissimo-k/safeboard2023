import { createSelector, EntityId } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { usersAdapter } from './state';
import { selectGroupByIdForCombinedSelectors } from '../groups/selectors';
import { UserDataView } from '../../models/UserDataView';

export const selectUsersLoading = createSelector(
  (state: RootState) => state.users.isLoading,
  isLoading => isLoading,
);

export const selectUsersTotalQuantity = createSelector(
  (state: RootState) => state.users.totalItems,
  totalItems => totalItems,
);

export const selectUsersTotalPagesQuantity = createSelector(
  (state: RootState) => state.users.totalPages,
  totalPages => totalPages,
);

export const selectUsersCurrentPage = createSelector(
  (state: RootState) => state.users.currentPage,
  currentPage => currentPage,
);

export const selectUsersPerPage = createSelector(
  (state: RootState) => state.users.perPage,
  perPage => perPage,
);

export const {
  /** Select all users. */
  selectAll: selectAllUsers,
} = usersAdapter.getSelectors<RootState>(state => state.users);

export const selectUsersForDataView = createSelector(
  (state: RootState) => state.groups,
  selectAllUsers,
  (groupState, users) => users.map(user => {
    // Find related group.
    const group = user.groupId ? selectGroupByIdForCombinedSelectors(groupState, user.groupId as EntityId) : undefined;
    return {
      ...user,
      group: group ? group.title : 'Unnamed',
    } as UserDataView;
  }),
);
