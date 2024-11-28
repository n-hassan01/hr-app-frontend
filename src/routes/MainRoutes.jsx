import { lazy } from 'react';
// Project imports
import MainLayout from 'layout/MainLayout';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
// Lazy-loaded main content
const DashboardDefault = Loadable(lazy(() => import('views/dashboard')));
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const DataTable = Loadable(lazy(() => import('views/utilities/DataTable')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const SamplePage = Loadable(lazy(() => import('views/sample-page')));
// const AuthLogin3 = Loadable(lazy(() => import('views/pages/authentication3/Login3')));
// const AuthRegister3 = Loadable(lazy(() => import('views/pages/authentication3/Register3')));
// const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
//   { field: 'name', headerName: 'Name', width: 130 },
//   { field: 'age', headerName: 'Age', width: 90 },
//   { field: 'country', headerName: 'Country', width: 120 }
// ];

// const rows = [
//   { id: 1, name: 'John Doe', age: 35, country: 'USA' },
//   { id: 2, name: 'Jane Smith', age: 28, country: 'Canada' },
//   { id: 3, name: 'Alex Johnson', age: 45, country: 'UK' },
//   { id: 4, name: 'Alex Johnson', age: 45, country: 'UK' },
//   { id: 5, name: 'Alex Johnson', age: 45, country: 'UK' }
// ];
// Higher-order component for authentication
// const withAuth = (Component) => {
//   return ({ ...props }) => {
//     const isAuthenticated = !!localStorage.getItem('authToken'); // Example check
//     return isAuthenticated ? <Component {...props} /> : <AuthLogin3 />;
//   };
// };

const storedUser = localStorage.getItem('user');
console.log(storedUser);
const parsedUser = JSON.parse(storedUser);
console.log(parsedUser);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />, // Layout for main routes
  children: [
    {
      path: '/', // Redirect default to login
      element: parsedUser ? <DashboardDefault /> : <Navigate to="/pages/login/login3" replace />
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
      path: 'sample-page',
      element: <SamplePage />
    }
    // Other routes remain unchanged
  ]
};

export default MainRoutes;
