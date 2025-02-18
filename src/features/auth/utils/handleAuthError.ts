import type { FirebaseError } from 'firebase/app';
import type { AuthError } from 'firebase/auth';

interface HandleAuthErrorArgs {
  error: FirebaseError;
  setAuthErrorFunc: React.Dispatch<React.SetStateAction<AuthError | null>>;
}

const handleAuthError = ({
  error,
  setAuthErrorFunc,
}: HandleAuthErrorArgs): void => {
  setAuthErrorFunc(error as AuthError);
  console.error('Sign in failed:', error);
};

export { handleAuthError };
