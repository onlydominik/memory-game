import { Link, useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm.tsx';
import { Logo } from '../../../components/common/Logo/Logo.tsx';

import { useAuth } from '../../../hooks/useAuth.tsx';
import { useState, useEffect } from 'react';
import { useDocumentTitle } from '../../../hooks/useDocumentTitle.tsx';

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<unknown>(null);
  const navigate = useNavigate();

  useDocumentTitle('Sign In', { suffix: '- MIND MELD' });

  useEffect(() => {
    if (userLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [userLoggedIn, navigate]);

  const onSubmit = async (email: string, password: string) => {
    if (isSigningIn) return;

    try {
      setIsSigningIn(true);
      const { doSignInWithEmailAndPassword } = await import(
        '../../../services/firebase/auth.ts'
      );
      await doSignInWithEmailAndPassword(email, password);
      navigate('/');
    } catch (error) {
      setAuthError(error);
      console.error('Sign in failed:', error);
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
      setAuthError(error);
      console.error('Sign in failed:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <main className="grid gap-8 md:gap-12 mx-4 pt-8 md:pt-12 max-w-[25rem] sm:mx-auto">
      <Logo isLink={false} />
      <LoginForm
        onSubmit={onSubmit}
        authError={authError}
        isSigningIn={isSigningIn}
      />

      <p className="grid gap-4 justify-items-center font-sans text-center text-white/70 text-sm">
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
      </p>
    </main>
  );
};

Login.displayName = 'Login';

export default Login;
