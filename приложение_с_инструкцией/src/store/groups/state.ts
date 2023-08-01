import { createEntityAdapter } from '@reduxjs/toolkit';
import { Group } from '../../models/Group';

/**
 * Groups state.
 */
export interface GroupsState {

  /** Loading state. */
  readonly isLoading: boolean;

  /** Current page. */
  readonly currentPage: number;

  /** All pages. */
  readonly totalPages: number;

  /** All items. */
  readonly totalItems: number;

  /** Groups on one page. */
  readonly perPage: number;

  /** Error. */
  readonly error?: string;
}

export const groupEntityAdapter = createEntityAdapter<Group>({
  /**
   * Get key.
   * @param user Group model.
   */
  selectId: user => user.id,

  /**
   * Sort by handler.
   * @param a First item.
   * @param b Second item.
   */
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const initialState = groupEntityAdapter.getInitialState<GroupsState>({
  isLoading: false,
  currentPage: 1,
  totalItems: 0,
  totalPages: 1,
  perPage: 5,
});
