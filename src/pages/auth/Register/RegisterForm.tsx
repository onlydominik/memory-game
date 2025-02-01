import { FormEvent, useEffect, useState } from 'react';
import { Input } from '../../../components/Input';
import OrSeparator from '../../../components/OrSeparator';
import ContinueWithGoogle from '../../../components/ContinueWithGoogle/ContinueWithGoogle';
import { RegisterFormProps } from './TypesRegister';
import { isEmailVaild } from '../../../firebase/auth';

const RegisterForm = ({ onSubmit, authError }: RegisterFormProps) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  useEffect(() => {
    if (authError && authError.code === 'auth/invalid-email')
      setEmailError('Invalid email address firebase');
    else if (authError && authError.code === 'auth/email-already-in-use')
      setEmailError('Email already in use');
  }),
    [authError];
  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid =
      isPasswordMatching(password, confirmPassword) &&
      isPasswordValid(password);

    if (!isValid) return;
    onSubmit(email, username, password);
  };

  const isPasswordMatching = (
    password: string,
    confirmPassword: string
  ): boolean => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const isPasswordValid = (password: string): boolean => {
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const onBlurHandlerConfirmPassword = (): void => {
    if (confirmPassword) isPasswordValid(password);
    isPasswordMatching(password, confirmPassword);
  };

  const onBlurHandlerEmail = (): void => {
    if (email) isEmailVaild(email, setEmailError);
  };

  return (
    <form
      onSubmit={(e) => {
        onSubmitHandler(e);
      }}
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
        onChange={setEmail}
        onBlur={onBlurHandlerEmail}
        onFocus={() => {
          setEmailError(null);
        }}
        error={emailError}
        required
      />
      <label htmlFor="username" className="block mb-1 text-white">
        Username
      </label>
      <Input
        id="username"
        value={username}
        type="text"
        onChange={setUsername}
        required
      />
      <label htmlFor="password" className="block mb-1 text-white">
        Password
      </label>
      <Input
        id="password"
        type="password"
        value={password}
        onChange={setPassword}
        onBlur={onBlurHandlerConfirmPassword}
        onFocus={() => setError(null)}
      />
      <label htmlFor="confirmPassword" className="block mb-1 text-white">
        Confirm password
      </label>
      <Input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        onBlur={onBlurHandlerConfirmPassword}
        onFocus={() => setError(null)}
        error={error}
      />
      <button className="min-h-14 mt-4 w-full font-sans font-bold hover:opacity-90 transition-opacity bg-white rounded-md">
        Sign up
      </button>
      <OrSeparator />
      <ContinueWithGoogle />
      {false && (
        <div
          className="mt-2 py-4 px-4 font-sans bg-gray text-accentRed"
          role="alert"
          aria-live="assertive"
        >
          <p className="font-bold"></p>
          <p>If the problem persists, please contact the administrator.</p>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
