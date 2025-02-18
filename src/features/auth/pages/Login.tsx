import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@components/common/Logo/Logo.tsx';
import { useAuth } from '@hooks/useAuth.tsx';
import { useState, useEffect } from 'react';
import { useDocumentTitle } from '@hooks/useDocumentTitle.tsx';
import { LoginForm } from '../components/LoginForm.tsx';
import { handleAuthError } from '../utils/handleAuthError.ts';
import type { AuthError } from 'firebase/auth';
import type { FirebaseError } from 'firebase/app';

const Login: React.FC = () => {
  const { userLoggedIn, isLoading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const navigate = useNavigate();

  useDocumentTitle('Sign In', { suffix: '- MIND MELD' });

  useEffect(() => {
    if (!isLoading && userLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [userLoggedIn, navigate, isLoading]);

  const handleOnSubmit = async (email: string, password: string) => {
    if (isSigningIn) return;

    try {
      setIsSigningIn(true);
      setAuthError(null);
      const { doSignInWithEmailAndPassword } = await import(
        '../../../services/firebase/auth.ts'
      );
      await doSignInWithEmailAndPassword(email, password);
      navigate('/');
    } catch (error) {
      handleAuthError({
        error: error as FirebaseError,
        setAuthErrorFunc: setAuthError,
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleOnClickDoSignInAnonymously = async () => {
    try {
      setIsSigningIn(true);
      const { doSignInAnonymously } = await import(
        '../../../services/firebase/auth.ts'
      );
      await doSignInAnonymously();
      navigate('/');
    } catch (error) {
      handleAuthError({
        error: error as FirebaseError,
        setAuthErrorFunc: setAuthError,
      });
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <main className="grid gap-8 md:gap-12 pt-8 px-2 sm:px-0 md:pt-12 max-w-[25rem] mx-auto">
      <Logo isLink={false} />
      <LoginForm
        onSubmit={handleOnSubmit}
        authError={authError}
        isSigningIn={isSigningIn}
      />

      <div className="grid gap-4 justify-items-center font-sans text-center text-white/70 text-sm">
        <button
          onClick={handleOnClickDoSignInAnonymously}
          className={`text-xs hover:underline text-center w-fit ${
            isSigningIn && 'cursor-wait'
          }`}
        >
          Try as a Guest
        </button>
        <div>
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-logoTheme font-medium underline hover:opacity-90 transition-opacity"
          >
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
};

Login.displayName = 'Login';

export default Login;
