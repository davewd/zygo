import { Navigate, useLocation } from 'react-router-dom';
import { UserAuth } from '../../context/UserAuthContext';
import Layout from '../Layout';

const ProtectedRoutes = () => {
  const { session } = UserAuth();

  console.log(session);
  const location = useLocation();

  if (session === undefined) {
    return <div>Loading...</div>;
  }

  return session ? <Layout /> : <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoutes;
