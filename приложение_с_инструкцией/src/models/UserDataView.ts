import { User } from './User';

/** User model for table and other data views models. */
export interface UserDataView extends User {

  /** Group name. */
  group: string;
}
