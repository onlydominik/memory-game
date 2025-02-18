import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@components/common/Logo/Logo.tsx';
import { useAuth } from '@hooks/useAuth.tsx';
import { useDocumentTitle } from '@hooks/useDocumentTitle.tsx';
import RegisterForm from '../components/RegisterForm.tsx';
import { FirebaseError } from 'firebase/app';
import type { AuthError } from 'firebase/auth';

const Register = () => {
  const { userLoggedIn, isLoading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [authError, setAuthError] = useState<AuthError | null>(null);
  const navigate = useNavigate();

  useDocumentTitle('Sign Up', { suffix: '- MIND MELD' });

  useEffect(() => {
    if (!isLoading && userLoggedIn) {
      navigate('/', { replace: true });
    }
  }, [userLoggedIn, isLoading, navigate]);

  const onSubmit = async (
    email: string,
    username: string,
    password: string
  ) => {
    if (isSigningIn) return;

    try {
      setIsSigningIn(true);
      const { doCreateUserWithEmailAndPassword } = await import(
        '../../../services/firebase/auth.ts'
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
      if (error instanceof FirebaseError) {
        setAuthError(error as AuthError);
        console.error('Register failed:', error);
      } else {
        console.error('Unexpected error:', error);
        setAuthError(null);
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <main className="grid gap-8 px-2 sm:px-0 pt-8 max-w-[25rem] mx-auto">
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
