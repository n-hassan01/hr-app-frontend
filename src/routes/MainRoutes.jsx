import { lazy } from 'react';
// Project imports
import MainLayout from 'layout/MainLayout';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import { getUserData } from '../context/userContext';

// Lazy-loaded main content
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const DataTable = Loadable(lazy(() => import('views/utilities/DataTable')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const CandidateEvalution = Loadable(lazy(() => import('views/pages/candidate_evaluation_form')));

// For getting user data use this function just.
const user = getUserData();

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/', // Redirect default to login
      element: user ? <DashboardDefault /> : <Navigate to="/pages/login/login3" replace />
      // element: <DashboardDefault />
    },
    // element: user ? <DashboardLayout /> : <Navigate to="/login" />,
    // {
    //   path: 'pages/login/login3',
    //   element: <AuthLogin3 />
    // },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        },
        {
          path: 'util-color',
          element: <UtilsColor />
        },
        {
          path: 'data-table',
          element: <DataTable />
        },
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'candidate-evaluation',
      element: <CandidateEvalution />
    },

    {
      path: 'sample-page',
      element: <SamplePage />
    }
    // Other routes remain unchanged
  ]
};

export default MainRoutes;
