import { createBrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoutes from './components/ProtectedRoutes';
import CommunityHub from './pages/community/CommunityHub';
import CommunityProfiles from './pages/community/CommunityProfiles';
import CommunityProviders from './pages/community/CommunityProviders';
import ProfileDetail from './pages/community/ProfileDetail';
import CredentialProviderDetail from './pages/credentials/CredentialProviderDetail';
import CredentialProviders from './pages/credentials/CredentialProviders';
import CredentialSearch from './pages/credentials/CredentialSearch';
import CredentialsHub from './pages/credentials/CredentialsHub';
import CredentialVerify from './pages/credentials/CredentialVerify';
import Error from './pages/error/index';
import Feed from './pages/feed/index';
import Landing from './pages/Landing';
import Library from './pages/library/Library';
import ServiceCenterDetail from './pages/network/ServiceCenterDetail';
import ServiceNetworkProviderDetail from './pages/network/ServiceNetworkProviderDetail';
import ServiceNetworkProviders from './pages/network/ServiceNetworkProviders';
import ServiceProviderDetail from './pages/network/ServiceProviderDetail';
import Notifications from './pages/notifications/index';
import SignUp from './pages/signup';
import TimeLine from './pages/timeline';
import MilestoneDetailPage from './pages/timeline/MilestoneDetailPage';
import HolidayPlanner from './pages/tools/HolidayPlanner';
import Tools from './pages/tools/index';
import BreastfeedingTimer from './pages/tools/postnatal/BreastfeedingTimer';
import Updates from './pages/updates/index';

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
      {
        path: '/community/network-providers',
        element: <ServiceNetworkProviders />,
        errorElement: <Error />,
      },
      {
        path: '/community/network-providers/:id',
        element: <ServiceNetworkProviderDetail />,
        errorElement: <Error />,
      },
      // Credentials routes
      { path: '/credentials', element: <CredentialsHub />, errorElement: <Error /> },
      { path: '/credentials/providers', element: <CredentialProviders />, errorElement: <Error /> },
      {
        path: '/credentials/providers/:id',
        element: <CredentialProviderDetail />,
        errorElement: <Error />,
      },
      { path: '/credentials/verify', element: <CredentialVerify />, errorElement: <Error /> },
      { path: '/credentials/search', element: <CredentialSearch />, errorElement: <Error /> },

      { path: '/tools', element: <Tools />, errorElement: <Error /> },
      {
        path: '/tools/postnatal/breastfeeding-timer',
        element: <BreastfeedingTimer />,
        errorElement: <Error />,
      },
      {
        path: '/tools/holiday-planner',
        element: <HolidayPlanner />,
        errorElement: <Error />,
      },

      { path: '/timeline', element: <TimeLine />, errorElement: <Error /> },
      {
        path: '/timeline/milestone/:milestoneId/:familyMemberId?',
        element: <MilestoneDetailPage />,
        errorElement: <Error />,
      },
      { path: '/notifications', element: <Notifications />, errorElement: <Error /> },
      { path: '/updates', element: <Updates />, errorElement: <Error /> },

      // Add missing routes that are referenced in the codebase
      {
        path: '/terms',
        element: <div>Terms of Service - Coming Soon</div>,
        errorElement: <Error />,
      },
      { path: '/about', element: <div>About Us - Coming Soon</div>, errorElement: <Error /> },
      { path: '/library', element: <Library />, errorElement: <Error /> },
      {
        path: '/community/groups',
        element: <div>Groups - Coming Soon</div>,
        errorElement: <Error />,
      },

      // Additional tools routes
      {
        path: '/tools/postnatal/sleep-tracker',
        element: <div>Sleep Tracker - Coming Soon</div>,
        errorElement: <Error />,
      },
      {
        path: '/tools/health/growth-tracker',
        element: <div>Growth Tracker - Coming Soon</div>,
        errorElement: <Error />,
      },
      {
        path: '/tools/health/medication-reminder',
        element: <div>Medication Reminder - Coming Soon</div>,
        errorElement: <Error />,
      },
    ],
    errorElement: <Error />,
  },
  { path: '/login', element: <Login />, errorElement: <Error /> },
  { path: '/signup', element: <SignUp />, errorElement: <Error /> },
  { path: '/', element: <Landing />, errorElement: <Error /> },
]);
