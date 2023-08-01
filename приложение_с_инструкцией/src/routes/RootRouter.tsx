import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { welcomeRoutes } from '../features/welcome/routes';
import { usersRoutes } from '../features/data/routes';

const routes: RouteObject[] = [
  ...usersRoutes,
  ...welcomeRoutes,
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
