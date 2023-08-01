/**
 * User model.
 */
export interface User {

  /** Identification string. */
  readonly id: string;

  /** Email address. */
  readonly email: string;

  /** Name. */
  readonly name: string;

  /** User group. */
  readonly groupId: string | null;

  /** Account. */
  readonly account: string;

  /** Phone. */
  readonly phone: string;
}
