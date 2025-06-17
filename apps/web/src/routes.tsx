import { createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import BreastfeedingTest from './pages/BreastfeedingTest';
import CommunityHub from './pages/community/CommunityHub';
import CommunityProfiles from './pages/community/CommunityProfiles';
import CommunityProviders from './pages/community/CommunityProviders';
import ProfileDetail from './pages/community/ProfileDetail';
import Error from './pages/error/index';
import Feed from './pages/feed/index';
import Landing from './pages/Landing';
import ServiceCenterDetail from './pages/network/ServiceCenterDetail';
import ServiceNetworkProviderDetail from './pages/network/ServiceNetworkProviderDetail';
import ServiceNetworkProviders from './pages/network/ServiceNetworkProviders';
import ServiceProviderDetail from './pages/network/ServiceProviderDetail';
import SignUp from './pages/signup';
import TimeLine from './pages/timeline';
import Tools from './pages/tools/index';

export const routes = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      { path: '/feed', element: <Feed />, errorElement: <Error /> },

      // Community routes (consolidated from network)
      { path: '/community', element: <CommunityHub />, errorElement: <Error /> },
      { path: '/community/profiles', element: <CommunityProfiles />, errorElement: <Error /> },
      { path: '/community/profiles/:id', element: <ProfileDetail />, errorElement: <Error /> },
      { path: '/community/providers', element: <CommunityProviders />, errorElement: <Error /> },
      {
        path: '/community/providers/:id',
        element: <ServiceProviderDetail />,
        errorElement: <Error />,
      },
      { path: '/community/centers/:id', element: <ServiceCenterDetail />, errorElement: <Error /> },

      // Legacy network routes - redirect to community
      { path: '/network', element: <CommunityHub />, errorElement: <Error /> },
      { path: '/network/services', element: <CommunityHub />, errorElement: <Error /> },
      { path: '/network/centers', element: <CommunityHub />, errorElement: <Error /> },
      { path: '/network/centers/:id', element: <ServiceCenterDetail />, errorElement: <Error /> },
      { path: '/network/providers', element: <CommunityProviders />, errorElement: <Error /> },
      {
        path: '/network/providers/:id',
        element: <ServiceProviderDetail />,
        errorElement: <Error />,
      },
      {
        path: '/network/network-providers',
        element: <ServiceNetworkProviders />,
        errorElement: <Error />,
      },
      {
        path: '/network/network-providers/:id',
        element: <ServiceNetworkProviderDetail />,
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
