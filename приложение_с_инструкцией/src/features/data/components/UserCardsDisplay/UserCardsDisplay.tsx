import React, { FC, LegacyRef, memo, useCallback, useRef } from 'react';
import { CircularProgress, Grid, Typography } from '@mui/material';
import { UserDataView } from '../../../../models/UserDataView';
import { UserDto } from '../../../../api/dtos/userDto';
import { UserCard } from '../UserCard';
import { addMoreUsers } from '../../../../store/users/dispatchers';
import { useAppDispatch } from '../../../../store';
import { SortDirection } from '../../../../store/dataView/state';
import style from './UserCardsDisplay.module.scss';

/**
 * User table props.
 */
interface UsersCardsProps {

  /** Users.*/
  readonly users: UserDataView[];

  /** Loading state. */
  readonly isLoading: boolean;

  /** Current page. */
  readonly currentPage: number;

  /** Users per page. */
  readonly perPage: number;

  /** Total paged quantity. */
  readonly totalPages: number;

  /** Sort direction. */
  readonly sortDirection: SortDirection;

  /** Field to sort by. */
  readonly sortField: keyof UserDto;

  /** String to search by. */
  readonly searchString: string;
}

/**
 * User card display.
 */
const UserCardsDisplayComponent: FC<UsersCardsProps> = ({
  users,
  isLoading,
  totalPages,
  sortField,
  sortDirection,
  perPage,
  currentPage,
  searchString,
}) => {
  const dispatch = useAppDispatch();

  /**
   * Pagination handler.
   */
  const paginationModelChangeHandler = (): void => {
    dispatch(addMoreUsers({
      page: currentPage + 1,
      sortDirection,
      sortField,
      perPage,
      searchString,
    }));
  };

  const observer = useRef<IntersectionObserver>();
  const lastUserElementRef = useCallback(
    (node: Element) => {
      if (isLoading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          paginationModelChangeHandler();
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [currentPage, totalPages, sortDirection, perPage, sortField, searchString],
  );

  return (
    <div className={style.cardsWrapper}>
      {/* If first loading. */}
      {users.length === 0 && isLoading ?
        <Typography>No data</Typography> :
        (
          <Grid container spacing={4} columns={60}>
            {users.map((user, index) => (index + 1 === users.length ?
              (
                <Grid item xs={30} sm={20} md={15} lg={12} key={user.id}>
                  <div ref={lastUserElementRef as LegacyRef<HTMLDivElement>}>
                    <UserCard name={user.name} group={user.group} phone={user.phone} />
                  </div>
                </Grid>
              ) :
              (
                <Grid item xs={30} sm={20} md={15} lg={12} key={user.id}>
                  <div>
                    <UserCard name={user.name} group={user.group} phone={user.phone} />
                  </div>
                </Grid>
              )))}
          </Grid>
        )}
      {isLoading && <CircularProgress />}
    </div>
  );
};

export const UserCardsDisplay = memo(UserCardsDisplayComponent);
