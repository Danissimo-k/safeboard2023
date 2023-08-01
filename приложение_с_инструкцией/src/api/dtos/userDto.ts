/**
 * User users transfer object.
 */
export interface UserDto {

  /** Identification string. */
  readonly 'id': string;

  /** Email address. */
  readonly 'email': string;

  /** Name. */
  readonly 'name': string;

  /** User group. */
  readonly 'group': string;

  /** Account. */
  readonly 'account': string;

  /** Phone. */
  readonly 'phone': string;
}
