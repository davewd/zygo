import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserAuth } from '../../context/UserAuthContext';
const ProtectedRoutes = () => {
  const { session } = UserAuth();

  console.log(session);
  const location = useLocation();

  if (session === undefined) {
    return <div>Loading...</div>;
  }

  return session ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoutes;
