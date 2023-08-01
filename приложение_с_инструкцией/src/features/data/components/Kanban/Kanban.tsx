import React, { FC, memo } from 'react';
import { Group } from '@models/Group';
import { UserDataView } from '@models/UserDataView';
import { KanbanCardList } from '../KanbanCardList';
import styles from './Kanban.module.scss';

/**
 * User table props.
 */
interface UsersTableProps {

  /** Users. */
  readonly users: UserDataView[];

  /** Groups. */
  readonly groups: Group[];
}

/** Kanban board. */
const KanbanComponent: FC<UsersTableProps> = ({ users, groups }) => (
  <div className={styles.containerWrapper}>
    {groups.map(group => (
      <KanbanCardList
        key={group.id}
        groupName={group.title}
        users={users.filter(user => user.groupId === group.id)}
      />
    ))}
  </div>
);

export const Kanban = memo(KanbanComponent);
