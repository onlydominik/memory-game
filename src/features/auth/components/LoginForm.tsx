import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Input } from '@components/common/Input';
import { OrSeparator } from '@components/OrSeparator';
import { ContinueWithGoogle } from '@components/ContinueWithGoogle/ContinueWithGoogle';
import { validateEmail } from '../utils/validateEmail';
import type { AuthError } from 'firebase/auth';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  authError: AuthError | null;
  isSigningIn: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  authError,
  isSigningIn,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);

  useEffect(() => {
    if (authError?.code === 'auth/invalid-credential') {
      setEmailError('Invalid email or password. Please try again.');
    }
  }, [authError]);

  const validatePassword = (value: string): boolean => {
    if (!value.trim()) {
      setPassError('You must enter a password');
      return false;
    }
    setPassError(null);
    return true;
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isEmailValid = await validateEmail(email, setEmailError);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      await onSubmit(email, password);
    }
  };

  const onBlurHandlerEmail = () => {
    if (email) validateEmail(email, setEmailError);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      aria-label="Login form"
      className={`grid gap-1 text-sm font-mono ${isSigningIn && 'cursor-wait'}`}
    >
      <label htmlFor="email" className="block mb-1 text-white">
        Email
      </label>
      <Input
        id="email"
        value={email}
        type="email"
        onChange={handleEmailChange}
        onBlur={onBlurHandlerEmail}
        onFocus={() => {
          setEmailError(null);
        }}
        error={emailError}
        required
        aria-required="true"
        aria-invalid={!!emailError}
      />
      <label htmlFor="password" className="block mb-1 text-white">
        Password
      </label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        onFocus={() => {
          setPassError(null);
        }}
        error={passError}
        aria-required="true"
        aria-invalid={!!passError}
      />
      <button
        className={`min-h-14 mt-4 w-full font-sans font-bold hover:opacity-90 transition-opacity bg-white rounded-md ${
          isSigningIn && 'cursor-wait'
        }`}
      >
        Log in
      </button>
      <OrSeparator />
      <ContinueWithGoogle />
    </form>
  );
};

LoginForm.displayName = 'LoginForm';

export { LoginForm };
