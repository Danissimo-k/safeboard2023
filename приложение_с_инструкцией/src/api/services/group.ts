import pb from '../http';
import { Group } from '../../models/Group';
import { GroupMapper } from '../mappers/groupMapper';
import { GroupDto } from '../dtos/groupDto';

/**
 * Props to fetchByPagination users from for users view.
 */
export interface FetchGroupsByPaginationProps {

  /** The page (aka. Offset) of the paginated list. */
  page: number;

  /** Specify the max returned records per page. */
  perPage: number;

  /** Field to sort by. */
  sortField: keyof Group;

  /** Sort direction. */
  sortDirection: 'asc' | 'desc';
}

/**
 * Response result.
 */
export interface FetchGroupsByPaginationResult {

  /** The page (aka. Offset) of the paginated list. */
  page: number;

  /** Specify the max returned records per page. */
  perPage: number;

  /** Quantity of all pages. */
  totalPages: number;

  /** Quantity of all users. */
  totalItems: number;

  /** Groups. */
  items: Group[];
}

export namespace GroupService {

  const collection = pb.collection('groups');

  /**
   * Fetch groups by pagination.
   */
  export async function fetchByPagination({
    page = 1,
    perPage = 30,
    sortField = 'title',
    sortDirection = 'asc',
  }: FetchGroupsByPaginationProps): Promise<FetchGroupsByPaginationResult> {
    const result = await collection.getList(page, perPage, {
      sort: `${sortDirection === 'asc' ? '' : '-'}${sortField}`,
    });
    return {
      ...result,
      items: (result.items as unknown as GroupDto[]).map(GroupMapper.fromDto),
    };
  }

  /**
   * Fetch all groups.
   */
  export async function fetchAll(): Promise<Group[]> {
    const result = await collection.getFullList({
      sort: 'title',
    });
    return (result as unknown as GroupDto[]).map(GroupMapper.fromDto);
  }

}
