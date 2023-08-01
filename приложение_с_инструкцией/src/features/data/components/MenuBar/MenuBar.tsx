import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Container';
import { ChangeEvent, FC, memo, useCallback, useEffect } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { InputBase, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { DataView, SortDirection } from '@store/dataView/state';
import { useAppDispatch, useAppSelector } from '@store/index';
import {
  selectCurrentDataView,
  selectCurrentSortDirection,
  selectCurrentSortField, selectSearchSting,
} from '@store/dataView/selectors';
import {
  changeDataView,
  changeSearchString,
  changeSortDirection,
  changeSortField,
} from '@store/dataView/slice';
import { UserDto } from '@dtos/userDto';
import { fetchUsers, fetchWithGroupOnly } from '@store/users/dispatchers';
import { selectUsersPerPage } from '@store/users/selectors';
import useDebounce from '@hooks/debounce';
import styles from './MenuBar.module.scss';

type IDataViews = {
  [key in DataView]: string;
};

type ISortFields = {
  [key in keyof Partial<UserDto>]: string;
};

type ISortDirection = {
  [key in SortDirection]: string;
};

/**
 * MenuBar with sorting and users view changing.
 */
const MenuBarComponent: FC = () => {
  const dispatch = useAppDispatch();
  const dataView = useAppSelector(selectCurrentDataView);
  const currentSortField = useAppSelector(selectCurrentSortField);
  const currentSortDir = useAppSelector(selectCurrentSortDirection);
  const perPage = useAppSelector(selectUsersPerPage);
  const searchString = useAppSelector(selectSearchSting);
  const debouncedSearchString = useDebounce<string>(searchString, 1500);

  const sortFields: ISortFields = {
    name: 'Полное имя',
    email: 'Электронная почта',
    account: 'Учетная запись',
    phone: 'Номер телефона',
  };

  const dataViews: IDataViews = {
    TABLE: 'Таблица',
    KANBAN: 'Канбан',
    CARDS: 'Карточки',
  };

  const sortDirections: ISortDirection = {
    asc: 'Возрастание',
    desc: 'Убывание',
  };

  /**
   * Data view changing handler.
   * @param event Event.
   */
  const dataViewChangedHandler = useCallback((event: SelectChangeEvent): void => {
    dispatch(changeDataView(event.target.value as DataView));
  }, [dispatch]);

  /**
   * Sort field changing handler.
   * @param event Event.
   */
  const sortFieldChangedHandler = useCallback((event: SelectChangeEvent): void => {
    dispatch(changeSortField(event.target.value as keyof UserDto));
  }, [dispatch]);

  /**
   * Search string changing handler.
   * @param event Event.
   */
  const onInputByNameChangeHandler = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(changeSearchString(event.target.value as string));
  }, []);

  /**
   * Sort direction changing handler.
   * @param event Event.
   */
  const onSortDirectionChangeHandler = useCallback((event: SelectChangeEvent) => {
    dispatch(changeSortDirection(event.target.value as SortDirection));
  }, [dispatch]);

  useEffect(() => {
    if (dataView !== 'KANBAN') {
      dispatch(fetchUsers({
        sortField: currentSortField,
        page: 1,
        sortDirection: currentSortDir,
        perPage,
        searchString: debouncedSearchString,
      }));
    } else {
      dispatch(fetchWithGroupOnly({
        sortField: currentSortField,
        sortDirection: currentSortDir,
        searchString: debouncedSearchString,
      }));
    }
  }, [dataView, currentSortField, currentSortDir, debouncedSearchString]);

  return (
    <AppBar component="nav" className={styles.appBar}>
      <Box maxWidth="xl">
        <Toolbar disableGutters>
          <Box>
            SafeBoard 2023
          </Box>
          <Box className={styles.spacer} />
          <Box className={styles.selectWrapper}>
            <Typography>
              Вид отображения:
            </Typography>
            <Select
              value={dataView}
              onChange={dataViewChangedHandler}
              className={styles.menuBarSelect}
            >
              {Object.entries(dataViews).map(([key, title]) => <MenuItem key={key} value={key}>{title}</MenuItem>)}
            </Select>
          </Box>
          <Box className={styles.selectWrapper}>
            <Typography>
              Сортировать по:
            </Typography>
            <Select
              onChange={sortFieldChangedHandler}
              value={currentSortField}
              className={styles.menuBarSelect}
            >
              {Object.entries(sortFields).map(([key, title]) => <MenuItem key={key} value={key}>{title}</MenuItem>)}
            </Select>
            <Select
              onChange={onSortDirectionChangeHandler}
              value={currentSortDir}
              className={styles.menuBarSelect}
            >
              {Object.entries(sortDirections).map(([key, title]) => <MenuItem key={key} value={key}>{title}</MenuItem>)}
            </Select>
          </Box>
          <Box className={styles.searchInputWrapper}>
            <Box className={styles.iconWrapper}>
              <SearchIcon />
            </Box>
            <InputBase className={styles.searchInputBase} value={searchString} onChange={onInputByNameChangeHandler} />
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export const MenuBar = memo(MenuBarComponent);
