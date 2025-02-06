import { createContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../services/firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/common/Loader/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

type AuthContextType = {
  currentUser: any;
  userLoggedIn: boolean;
  isLoading: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userLoggedIn: false,
  isLoading: true,
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUserLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userLoggedIn,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !currentUser) {
      navigate('/login');
    }
  }, [currentUser, isLoading, navigate]);

  if (isLoading)
    return <Loader size="lg" color="light" className="mx-auto mt-20" />;
  if (!currentUser) return null;

  return <>{children}</>;
};

export const RedirectIfLoggedIn = ({ children }: ProtectedRouteProps) => {
  const { userLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center">
        <Loader size="lg" color="light" className="mx-auto" />
      </div>
    );
  }

  return userLoggedIn ? <Navigate to="/" replace /> : <>{children}</>;
};
