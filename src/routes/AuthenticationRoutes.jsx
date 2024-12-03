import { lazy } from 'react';

// Project imports
import MinimalLayout from 'layout/MinimalLayout';
import Loadable from 'ui-component/Loadable';

// Lazy-loaded authentication pages
const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //
const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />, // Layout for the authentication routes
  children: [
    {
      path: '/',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/login/login3',
      element: <AuthLogin3 />
    },
    {
      path: '/pages/register/register3',
      element: <AuthRegister3 />
    }
  ]
};

export default AuthenticationRoutes;
