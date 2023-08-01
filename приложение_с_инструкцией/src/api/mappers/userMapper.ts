import { UserDto } from '../dtos/userDto';
import { User } from '../../models/User';

/**
 * Mapper for user model.
 */
export namespace UserMapper {

  /**
   * Maps dto to model.
   * @param dto Post dto.
   */
  export function fromDto(dto: UserDto): User {
    return ({
      id: dto.id,
      email: dto.email,
      name: dto.name,
      groupId: dto.group.length ? dto.group : null,
      account: dto.account,
      phone: dto.phone,
    });
  }
}
