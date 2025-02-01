import { Link, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm.tsx';
import { Logo } from '../../../components/Logo/Logo.tsx';

import {
  doSignInAnonymously,
  doSignInWithEmailAndPassword,
} from '../../../firebase/auth.ts';
import { useAuth } from '../../../hooks/useAuth.tsx';
import { useState, useEffect } from 'react';

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<unknown>(null);
  const navigate = useNavigate();

  const onSubmit = async (email: string, password: string) => {
    if (!isSigningIn) {
      try {
        setIsSigningIn(true);
        await doSignInWithEmailAndPassword(email, password);
        navigate('/');
      } catch (error) {
        setAuthError(error);
        console.error('Sign in failed:', error);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  useEffect(() => {
    if (userLoggedIn) {
      navigate('/');
    }
  }, [userLoggedIn, navigate]);

  return (
    <main className="grid gap-8 md:gap-12 mx-4 pt-8 md:pt-12 max-w-[25rem] sm:mx-auto">
      <Logo isLink={false} />
      <LoginForm
        onSubmit={onSubmit}
        authError={authError}
        isSigningIn={isSigningIn}
      />

      <p className="grid gap-4 font-sans text-center text-white/70 text-sm">
        <button
          onClick={doSignInAnonymously}
          className="text-xs hover:underline"
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
