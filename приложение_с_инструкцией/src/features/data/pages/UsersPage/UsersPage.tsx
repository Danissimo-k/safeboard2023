import React, { FC, useEffect, useState } from 'react';
import { Toolbar, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { MenuBar } from '../../components/MenuBar';
import styles from './UsersPage.module.scss';
import {
  selectAllUsers,
  selectUsersCurrentPage, selectUsersForDataView,
  selectUsersLoading,
  selectUsersPerPage, selectUsersTotalPagesQuantity, selectUsersTotalQuantity,
} from '../../../../store/users/selectors';
import { useAppDispatch, useAppSelector } from '../../../../store';
import {
  selectAllGroups,
  selectGroupsCurrentPage,
  selectGroupsLoading,
  selectGroupsPerPage,
} from '../../../../store/groups/selectors';
import { fetchAllGroups, fetchGroups } from '../../../../store/groups/dispatchers';
import { fetchUsers } from '../../../../store/users/dispatchers';
import {
  selectCurrentDataView,
  selectCurrentSortDirection,
  selectCurrentSortField, selectSearchSting,
} from '../../../../store/dataView/selectors';
import { UsersTable } from '../../components/UsersTable';
import { UserCardsDisplay } from '../../components/UserCardsDisplay/UserCardsDisplay';
import { Kanban } from '../../components/Kanban';

/**
 * Page to show users.
 */
export const UsersPage: FC = () => {
  const dispatch = useAppDispatch();

  const userDataView = useAppSelector(selectUsersForDataView);
  const usersLoading = useAppSelector(selectUsersLoading);
  const usersCurrentPage = useAppSelector(selectUsersCurrentPage);
  const usersPerPage = useAppSelector(selectUsersPerPage);
  const usersTotalQuantity = useAppSelector(selectUsersTotalQuantity);
  const usersPagesTotalQuantity = useAppSelector(selectUsersTotalPagesQuantity);

  const groups = useAppSelector(selectAllGroups);

  const dataView = useAppSelector(selectCurrentDataView);
  const currentSortField = useAppSelector(selectCurrentSortField);
  const sortDirection = useAppSelector(selectCurrentSortDirection);
  const searchString = useAppSelector(selectSearchSting);

  /**
   * Data view switcher.
   */
  const getDataView = (): JSX.Element => {
    switch (dataView) {
      case 'KANBAN':
        return (
          <Kanban
            groups={groups}
            users={userDataView}
          />
        );
      case 'TABLE':
        return (
          <UsersTable
            users={userDataView}
            isLoading={usersLoading}
            perPage={usersPerPage}
            currentPage={usersCurrentPage}
            totalUsers={usersTotalQuantity}
            sortField={currentSortField}
            sortDirection={sortDirection}
            searchString={searchString}
          />
        );
      case 'CARDS':
        return (
          <UserCardsDisplay
            users={userDataView}
            isLoading={usersLoading}
            perPage={usersPerPage}
            currentPage={usersCurrentPage}
            sortField={currentSortField}
            sortDirection={sortDirection}
            totalPages={usersPagesTotalQuantity}
            searchString={searchString}
          />
        );
      default:
        return <Typography>No data view</Typography>;
    }
  };

  useEffect(() => {
    dispatch(fetchAllGroups());

    // dispatch(fetchUsers({ page: usersCurrentPage, perPage: usersPerPage, sortField: currentSortField, sortDirection: 'asc' }));
  }, []);

  return (
    <div className={styles.usersPageWrapper}>
      <Toolbar />
      <MenuBar />
      {getDataView()}
    </div>
  );
};
