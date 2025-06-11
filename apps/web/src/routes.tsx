import { Route, Routes } from 'react-router-dom';
import Feed from './pages/feed/index';
import Landing from './pages/landing/index';
import Network from './pages/network/index';
import NotFound from './pages/NotFound';
import TimeLine from './pages/timeline/index';
import Tools from './pages/tools/index';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/feed/*" element={<Feed />} />
    <Route path="/community/*" element={<Network />} />
    <Route path="/tools/*" element={<Tools />} />
    <Route path="/timeline/*" element={<TimeLine />} />

    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
