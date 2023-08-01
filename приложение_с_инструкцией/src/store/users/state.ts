import { createEntityAdapter } from '@reduxjs/toolkit';
import { User } from '../../models/User';

/**
 * Users state.
 */
export interface UsersState {

  /** Loading state. */
  readonly isLoading: boolean;

  /** Current page. */
  readonly currentPage: number;

  /** All pages. */
  readonly totalPages: number;

  /** All items. */
  readonly totalItems: number;

  /** Users on one page. */
  readonly perPage: number;

  /** Error. */
  readonly error?: string;
}

export const usersAdapter = createEntityAdapter<User>({
  /**
   * Get key.
   * @param user User model.
   */
  selectId: user => user.id,
});

export const initialState = usersAdapter.getInitialState<UsersState>({
  isLoading: false,
  currentPage: 1,
  totalItems: 0,
  totalPages: 1,
  perPage: 15,
});
