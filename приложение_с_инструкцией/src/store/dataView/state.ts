import { UserDto } from '../../api/dtos/userDto';

export type DataView = 'TABLE' | 'KANBAN' | 'CARDS';

export type SortDirection = 'asc' | 'desc';

/**
 *  Data view state.
 */
export interface DataViewState {

  /** Field to sort by. */
  sortField: keyof UserDto;

  /** Selected data view.*/
  currentDataView: DataView;

  /** Sort direction. */
  sortDirection: SortDirection;

  /** String to search by. */
  searchString: string;
}

export const initialState: DataViewState = {
  sortDirection: 'asc',
  currentDataView: 'TABLE',
  sortField: 'name',
  searchString: '',
};
