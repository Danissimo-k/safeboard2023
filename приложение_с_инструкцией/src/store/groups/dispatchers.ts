import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchGroupsByPaginationProps, FetchGroupsByPaginationResult, GroupService } from '../../api/services/group';
import { Group } from '../../models/Group';

export const fetchGroups = createAsyncThunk<FetchGroupsByPaginationResult, FetchGroupsByPaginationProps>(
  'groups/fetchByPagination',
  props => GroupService.fetchByPagination(props),
);

export const fetchAllGroups = createAsyncThunk<Group[]>(
  'groups/fetchAll',
  () => GroupService.fetchAll(),
);
