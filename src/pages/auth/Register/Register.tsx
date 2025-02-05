import { Link, useNavigate } from 'react-router-dom';
import RegisterForm from './RegisterForm.tsx';
import { Logo } from '../../../components/Logo/Logo.tsx';

import { useAuth } from '../../../hooks/useAuth.tsx';
import { useState, useEffect } from 'react';
import Loader from '../../../components/Loader/Loader.tsx';

const Register = () => {
  const { userLoggedIn, isLoading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<any>(null);
  const navigate = useNavigate();

  const onSubmit = async (
    email: string,
    username: string,
    password: string
  ) => {
    if (isSigningIn) return;

    try {
      setIsSigningIn(true);
      const { doCreateUserWithEmailAndPassword } = await import(
        '../../../firebase/auth'
      );
      const { updateProfile } = await import('firebase/auth');

      const userCredential = await doCreateUserWithEmailAndPassword(
        email,
        password
      );

      const user = userCredential.user;
      await updateProfile(user, {
        displayName: username,
      });

      navigate('/login');
    } catch (error) {
      setAuthError(error);
      console.error('Register failed:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  useEffect(() => {
    if (!isLoading && userLoggedIn) {
      navigate('/');
    }
  }, [userLoggedIn, isLoading, navigate]);

  if (isLoading) return <Loader size="lg" color="light" />;
  return (
    <main className="grid gap-8 md:gap-8 mx-4 pt-8 md:pt-4 max-w-[25rem] sm:mx-auto">
      <Logo isLink={false} />
      <RegisterForm onSubmit={onSubmit} authError={authError} />
      <p className="font-sans text-center text-white/70 text-sm">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-logoTheme font-medium underline hover:opacity-90 transition-opacity"
        >
          Log in
        </Link>
      </p>
    </main>
  );
};

Register.displayName = 'Register';

export default Register;
