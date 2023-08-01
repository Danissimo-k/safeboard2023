import React, { FC } from 'react';
import { CircularProgress } from '@mui/material';
import styles from './LoadingPage.module.scss';

/** Page to show loading. */
export const LoadingPage: FC = () => (
  <div className={styles.pageWrapper}>
    <CircularProgress />
  </div>
);
