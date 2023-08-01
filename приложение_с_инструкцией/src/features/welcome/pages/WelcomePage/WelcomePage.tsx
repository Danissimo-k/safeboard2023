import React, { FC, MouseEventHandler } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './WelcomePage.module.scss';

/**
 * Welcome page with link to users.
 */
export const WelcomePage: FC = () => {
  const navigate = useNavigate();

  /**
   * Handle for navigation to users page.
   */
  const goToButtonHandler: MouseEventHandler<HTMLButtonElement> = () => {
    navigate('/users');
  };

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <div className={styles.welcomeText}>Добро пожаловать!</div>
        <div>
          Вы находитесь в тестовом задании Данила Коха, реализованное для проходения стажировки в SafeBoard.
        </div>
        <Button
          className={styles.goToButton}
          variant="contained"
          onClick={goToButtonHandler}
        >
          Перейти к списку пользователям
        </Button>
      </div>
    </div>
  );
};
