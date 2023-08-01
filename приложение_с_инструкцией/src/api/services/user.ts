import { User } from '../../models/User';
import pb from '../http';
import { UserMapper } from '../mappers/userMapper';
import { UserDto } from '../dtos/userDto';
import { SortDirection } from '../../store/dataView/state';

/**
 * Props to fetch users with group only.
 */
export interface FetchUsersWithGroupsOnlyProps {

  /** Field to sort by. */
  readonly sortField: keyof UserDto;

  /** Sort direction. */
  readonly sortDirection: SortDirection;

  /** String to search by. */
  readonly searchString: string;
}

/**
 * Props to fetchByPagination users from for users view.
 */
export interface FetchUsersByPaginationProps extends FetchUsersWithGroupsOnlyProps {

  /** The page (aka. Offset) of the paginated list. */
  readonly page: number;

  /** Specify the max returned records per page. */
  readonly perPage: number;

}

/**
 * Response result.
 */
export interface FetchUsersByPaginationResult {

  /** The page (aka. Offset) of the paginated list. */
  page: number;

  /** Specify the max returned records per page. */
  perPage: number;

  /** Quantity of all pages. */
  totalPages: number;

  /** Quantity of all users. */
  totalItems: number;

  /** Users. */
  items: User[];
}

export namespace UserService {
  const collection = pb.collection('users');

  /**
   * Fetch users by pagination.
   */
  export async function fetchByPagination(
    {
      page = 1,
      perPage = 30,
      sortField = 'name',
      sortDirection = 'asc',
      searchString,
    }: FetchUsersByPaginationProps,
  ): Promise<FetchUsersByPaginationResult> {
    const result = await collection.getList(page, perPage, {
      sort: `${sortDirection === 'asc' ? '' : '-'}${sortField}`,
      filter: `name~'${searchString}'`,
    });

    return {
      ...result,
      items: (result.items as unknown as UserDto[]).map(UserMapper.fromDto),
    };
  }

  /**
   * Fetch all groups.
   */
  export async function fetchWithGroupsOnly(
    {
      sortDirection = 'asc',
      sortField = 'name',
      searchString = '',
    }: FetchUsersWithGroupsOnlyProps,
  ): Promise<User[]> {
    const result = await collection.getFullList({
      sort: `${sortDirection === 'asc' ? '' : '-'}${sortField}`,
      filter: `group != "" && name~'${searchString}'`,
    });
    return (result as unknown as UserDto[]).map(UserMapper.fromDto);
  }

}
