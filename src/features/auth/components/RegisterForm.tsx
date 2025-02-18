import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Input } from '@components/common/Input';
import { OrSeparator } from '@components/OrSeparator';
import { ContinueWithGoogle } from '@components/ContinueWithGoogle/ContinueWithGoogle';
import { isPasswordMatching } from '../utils/isPasswordMatching';
import { validateEmail } from '../utils/validateEmail';
import { validatePasswordLength } from '../utils/validatePasswordLength';
import type { AuthError } from 'firebase/auth';

interface RegisterFormProps {
  onSubmit: (email: string, username: string, password: string) => void;
  authError: AuthError | null;
}

const RegisterForm = ({ onSubmit, authError }: RegisterFormProps) => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    const updateAuthError = () => {
      if (!authError) {
        return;
      }

      switch (authError.code) {
        case 'auth/invalid-email':
          setEmailError('Invalid email address');
          break;
        case 'auth/email-already-in-use':
          setEmailError('Email already in use');
          break;
        default:
          setEmailError('An error occurred during registration');
      }
    };
    updateAuthError();
  }, [authError]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid =
      isPasswordMatching(password, confirmPassword, setError) &&
      validatePasswordLength(password, setError);

    if (!isValid) return;
    onSubmit(email, username, password);
  };

  const onBlurHandlerConfirmPassword = (): void => {
    if (confirmPassword) validatePasswordLength(password, setError);
    isPasswordMatching(password, confirmPassword, setError);
  };

  const onBlurHandlerEmail = (): void => {
    if (email) validateEmail(email, setEmailError);
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    setConfirmPassword(e.target.value);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      aria-labelledby="Login form"
      className="grid gap-1 font-mono text-sm"
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
      <label htmlFor="username" className="block mb-1 text-white">
        Username
      </label>
      <Input
        id="username"
        value={username}
        type="text"
        onChange={handleUsernameChange}
        required
        aria-required="true"
      />
      <label htmlFor="password" className="block mb-1 text-white">
        Password
      </label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        onBlur={onBlurHandlerConfirmPassword}
        onFocus={() => setError(null)}
        aria-required="true"
      />
      <label htmlFor="confirmPassword" className="block mb-1 text-white">
        Confirm password
      </label>
      <Input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        onBlur={onBlurHandlerConfirmPassword}
        onFocus={() => setError(null)}
        error={error}
        aria-required="true"
      />
      <button className="min-h-14 mt-4 w-full font-sans font-bold hover:opacity-90 transition-opacity bg-white rounded-md">
        Sign up
      </button>
      <OrSeparator />
      <ContinueWithGoogle />
    </form>
  );
};

RegisterForm.displayName = 'RegisterForm';

export default RegisterForm;
