import React, { FC, memo } from 'react';
import { User } from '@models/User';
import styles from './KanbanCardList.module.scss';

interface KanbanCardListProps {

  /** Users. */
  readonly users: User[];

  /** Group name. */
  readonly groupName: string;
}

/**
 * Card list for kanban.
 */
const KanbanCardListComponent: FC<KanbanCardListProps> = ({ users, groupName }) => {
  return (
    <div className={styles.cardListWrapper}>
      <div className={styles.container}>
        <h3 className={styles.header}>{groupName}</h3>
        {users.map(user => (
          <div className={styles.userCard} key={user.id}>
            <div className={styles.userName}>{user.name}</div>
            <div>{user.email}</div>
          </div>
        ))}
        {users.length === 0 && <div>Нет пользователей</div>}
      </div>
    </div>
  );
};

export const KanbanCardList = memo(KanbanCardListComponent);
