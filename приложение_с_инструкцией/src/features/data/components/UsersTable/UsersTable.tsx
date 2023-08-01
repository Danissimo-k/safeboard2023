import React, { FC, memo } from 'react';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import styles from './UserTable.module.scss';
import { UserDataView } from '../../../../models/UserDataView';
import { useAppDispatch } from '../../../../store';
import { fetchUsers } from '../../../../store/users/dispatchers';
import { SortDirection } from '../../../../store/dataView/state';
import { UserDto } from '../../../../api/dtos/userDto';

/**
 * User table props.
 */
interface UsersTableProps {

  /** Users.*/
  readonly users: UserDataView[];

  /** Loading state. */
  readonly isLoading: boolean;

  /** Current page. */
  readonly currentPage: number;

  /** Users per page. */
  readonly perPage: number;

  /** Total users quantity. */
  readonly totalUsers: number;

  /** Sort direction. */
  readonly sortDirection: SortDirection;

  /** Field to sort by. */
  readonly sortField: keyof UserDto;

  /** Search string by. */
  readonly searchString: string;
}

/**
 * User table.
 */
const UsersTableComponent: FC<UsersTableProps> = ({
  users,
  perPage,
  currentPage,
  isLoading,
  totalUsers,
  sortDirection,
  sortField,
  searchString,
}) => {
  const dispatch = useAppDispatch();

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Полное имя',
      sortable: false,
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: 'account',
      headerName: 'Учетная запись',
      sortable: false,
      minWidth: 200,
      flex: 0.3,

    },
    {
      field: 'email',
      headerName: 'Электронная почта',
      sortable: false,
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: 'group',
      headerName: 'Группа',
      sortable: false,
      minWidth: 200,
      flex: 0.1,
    },
    {
      field: 'phone',
      headerName: 'Номер телефона',
      sortable: false,
      minWidth: 200,
    },
  ];

  /**
   * Pagination handler.
   * @param model Pagination model.
   */
  const paginationModelChangeHandler = (model: GridPaginationModel): void => {
    dispatch(fetchUsers({
      page: model.page + 1,
      sortDirection,
      sortField,
      perPage: model.pageSize,
      searchString,
    }));
  };
  return (
    <div className={styles.tableWrapper}>
      <DataGrid
        loading={isLoading}
        sortingMode="server"
        paginationMode="server"
        rows={users}
        paginationModel={{ page: currentPage - 1, pageSize: perPage }}
        rowCount={totalUsers}
        getRowClassName={params => (params.row.group === 'Unnamed' ? styles.unnamedGroupRow : '')}
        columns={columns}
        pageSizeOptions={[5]}
        disableColumnMenu
        hideFooterSelectedRowCount
        getRowId={row => row.id}
        onPaginationModelChange={paginationModelChangeHandler}
      />
    </div>
  );
};

export const UsersTable = memo(UsersTableComponent);
