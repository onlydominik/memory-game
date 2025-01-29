import { redirect, useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm.tsx';
import { Logo } from '../../../components/Logo/Logo.tsx';

import { doSignInWithEmailAndPassword } from '../../../firebase/auth.ts';
import { useAuth } from '../../../hooks/useAuth.tsx';
import { useState, useEffect } from 'react';

const Login = () => {
  const { userLoggedIn } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (email: string, password: string) => {
    if (!isSigningIn) {
      try {
        setIsSigningIn(true);
        await doSignInWithEmailAndPassword(email, password);
        navigate('/');
      } catch (error) {
        console.error('Sign in failed:', error);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  // Redirect if user is already logged in
  useEffect(() => {
    if (userLoggedIn) {
      navigate('/');
    }
  }, [userLoggedIn, navigate]);

  return (
    <main className="pt-10 max-w-screen-md mx-auto">
      <div
        className="min-h-32 flex items-center justify-center bg-startScreen-logoBg sm:rounded-t-3xl"
        role="banner"
        aria-label="Application logo">
        <Logo isLink={false} />
      </div>
      <LoginForm onSubmit={onSubmit} />
    </main>
  );
};

export default Login;
