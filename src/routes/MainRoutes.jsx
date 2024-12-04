import { lazy } from 'react';
// Project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import ProtectedRoute from '../routes/ProtectedRoutes'; // Import the ProtectedRoute

// Lazy-loaded main content
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const DataTable = Loadable(lazy(() => import('views/utilities/DataTable')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
const CandidateEvalution = Loadable(lazy(() => import('views/pages/candidate_evaluation_form')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    // {
    //   path: '/',
    //   element: <Navigate to="/pages/login/login3" replace /> // Default to login if no user
    // },

    // Protected Routes
    {
      path: 'dashboard',
      element: <DashboardDefault />,
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    {
      path: 'utils',
      element: <UtilsTypography />,
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
      element: <SamplePage /> // No authentication required for this route
    }
  ]
};

export default MainRoutes;
