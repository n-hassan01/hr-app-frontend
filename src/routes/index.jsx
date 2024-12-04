import { createBrowserRouter } from 'react-router-dom';

// routes
import LoginRoutes from './AuthenticationRoutes';
import CandidateRoutes from './CandidateRoutes';
import MainRoutes from './MainRoutes';

// ==============================|| ROUTING RENDER ||============================== //
const router = createBrowserRouter([LoginRoutes, MainRoutes, CandidateRoutes], {
  // basename: import.meta.env.VITE_APP_BASE_NAME
});

export default router;
