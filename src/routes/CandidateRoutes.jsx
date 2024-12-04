import { lazy } from 'react';

// Project imports
import MinimalLayout from 'layout/MinimalLayout';
import Loadable from 'ui-component/Loadable';

// Lazy-loaded authentication pages
const CandidatesEntryForm = Loadable(lazy(() => import('views/pages/candidates/CandidatesEntryForm')));

// ==============================|| CANDIDATE ROUTING ||============================== //
const CandidateRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/candidates/form',
      element: <CandidatesEntryForm />
    }
  ]
};

export default CandidateRoutes;
