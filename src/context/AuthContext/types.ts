import { User } from 'firebase/auth';

export type AuthContextType = {
  currentUser: User | null;
  userLoggedIn: boolean;
  isLoading: boolean;
};

export type AuthProviderProps = {
  children: React.ReactNode;
};
