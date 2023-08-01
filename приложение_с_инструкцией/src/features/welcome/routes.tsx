import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

const WelcomePage = lazy(() => import('./pages/WelcomePage').then(module => ({ default: module.WelcomePage })));

export const welcomeRoutes: RouteObject[] = [
  {
    path: '/',
    element: <WelcomePage />,
  },
];
