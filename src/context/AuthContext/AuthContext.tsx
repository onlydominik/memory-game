import { createContext } from 'react';
import { useAuthListener } from '@hooks/useAuthListener';
import type { AuthContextType, AuthProviderProps } from './types';

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  userLoggedIn: false,
  isLoading: true,
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authState = useAuthListener();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
