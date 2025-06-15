import { createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import BreastfeedingTest from './pages/BreastfeedingTest';
import Error from './pages/error/index';
import Feed from './pages/feed/index';
import Landing from './pages/Landing';
import Network from './pages/network/index';
import ServiceCenterDetail from './pages/network/ServiceCenterDetail';
import ServiceCenters from './pages/network/ServiceCenters';
import ServiceProviderDetail from './pages/network/ServiceProviderDetail';
import ServiceProviders from './pages/network/ServiceProviders';
import Services from './pages/network/Services';
import SignUp from './pages/signup';
import TimeLine from './pages/timeline';
import Tools from './pages/tools/index';

export const routes = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      { path: '/feed', element: <Feed />, errorElement: <Error /> },
      { path: '/network', element: <Network />, errorElement: <Error /> },
      { path: '/network/services', element: <Services />, errorElement: <Error /> },
      { path: '/network/centers', element: <ServiceCenters />, errorElement: <Error /> },
      { path: '/network/centers/:id', element: <ServiceCenterDetail />, errorElement: <Error /> },
      { path: '/network/providers', element: <ServiceProviders />, errorElement: <Error /> },
      {
        path: '/network/providers/:id',
        element: <ServiceProviderDetail />,
        errorElement: <Error />,
      },
      { path: '/tools', element: <Tools />, errorElement: <Error /> },
      { path: '/timeline', element: <TimeLine />, errorElement: <Error /> },
    ],
    errorElement: <Error />,
  },
  { path: '/login', element: <Login />, errorElement: <Error /> },
  { path: '/signup', element: <SignUp />, errorElement: <Error /> },
  { path: '/test/breastfeeding', element: <BreastfeedingTest />, errorElement: <Error /> },
  { path: '/', element: <Landing />, errorElement: <Error /> },
]);
