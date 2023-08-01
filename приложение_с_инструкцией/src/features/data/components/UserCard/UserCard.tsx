import React, { FC, memo } from 'react';
import { Card, Typography } from '@mui/material';
import staffIcon from '../../../../assets/staff.png';
import styles from './UserCard.module.scss';

/**
 * User card properties.
 */
interface UserCardProps {

  /** Name. */
  readonly name: string;

  /** Group name. */
  readonly group: string;

  /** Phone number. */
  readonly phone: string;
}

/**
 * User card component.
 */
const UserCardComponent: FC<UserCardProps> = ({ name, phone, group }) => (
  <Card className={styles.cardWrapper}>
    <Typography className={styles.fullName}>{name}</Typography>
    <img
      className={styles.userLogo}
      src={staffIcon}
      alt="Where is my src???"
    />
    <Typography className={group !== 'Unnamed' ? styles.groupName : styles.groupNameUnnamed}>
      {group}
    </Typography>
    <Typography className={styles.phone}>
      {phone}
    </Typography>
  </Card>
);

export const UserCard = memo(UserCardComponent);
