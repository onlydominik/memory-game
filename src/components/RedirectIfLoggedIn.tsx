import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const RedirectIfLoggedIn: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { userLoggedIn } = useAuth();

  return userLoggedIn ? <Navigate to="/" replace /> : <>{children}</>;
};

export { RedirectIfLoggedIn };
