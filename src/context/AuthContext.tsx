import { createContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/Loader/Loader';

export type AuthContextType = {
  currentUser: any;
  userLoggedIn: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userLoggedIn: false,
  isLoading: true,
});

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
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

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
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

export const RedirectIfLoggedIn = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
