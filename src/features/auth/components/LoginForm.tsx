import { FormEvent, useEffect, useState } from 'react';
import { Input } from '../../../components/common/Input';
import OrSeparator from '../../../components/OrSeparator';
import ContinueWithGoogle from '../../../components/ContinueWithGoogle/ContinueWithGoogle';
import { LoginFormProps } from '../types/TypesLogin';

const LoginForm = ({ onSubmit, authError, isSigningIn }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passError, setPassError] = useState<string | null>(null);

  useEffect(() => {
    if (authError && authError.code === 'auth/invalid-credential')
      setEmailError('Invalid email or password. Please try again.');
  }),
    [authError];

  const isPassValid = () => {
    if (password === '') {
      setPassError('You must enter a password');
      return false;
    }
    return true;
  };

  const validateEmail = async (email: string) => {
    const { isEmailVaild } = await import('../../../services/firebase/auth');
    return isEmailVaild(email, setEmailError);
  };

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError(null);
    setPassError(null);

    const isEmailValid = await validateEmail(email);
    if (!isEmailValid || !isPassValid()) {
      return;
    }

    onSubmit(email, password);
  };

  const onBlurHandlerEmail = () => {
    if (email) validateEmail(email);
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
        onChange={setEmail}
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
        onChange={setPassword}
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

export default LoginForm;
