import { GroupDto } from '../dtos/groupDto';
import { Group } from '../../models/Group';

/**
 * Mapper for group model.
 */
export namespace GroupMapper {

  /**
   * Maps dto to model.
   * @param dto Post dto.
   */
  export function fromDto(dto: GroupDto): Group {
    return ({
      id: dto.id,
      title: dto.title,
    });
  }
}
