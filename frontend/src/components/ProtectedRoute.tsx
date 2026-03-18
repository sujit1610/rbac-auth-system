import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/AuthContext';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn } = useAuthContext();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
