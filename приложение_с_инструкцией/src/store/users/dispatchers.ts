import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  FetchUsersByPaginationProps,
  FetchUsersByPaginationResult,
  FetchUsersWithGroupsOnlyProps,
  UserService,
} from '../../api/services/user';
import { User } from '../../models/User';

export const fetchUsers = createAsyncThunk<FetchUsersByPaginationResult, FetchUsersByPaginationProps>(
  'users/fetchByPagination',
  props => UserService.fetchByPagination(props),
);

export const addMoreUsers = createAsyncThunk<FetchUsersByPaginationResult, FetchUsersByPaginationProps>(
  'users/addMore',
  props => UserService.fetchByPagination(props),
);

export const fetchWithGroupOnly = createAsyncThunk<User[], FetchUsersWithGroupsOnlyProps>(
  'users/withGroupsOnly',
  props => UserService.fetchWithGroupsOnly(props),
);
