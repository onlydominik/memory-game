import { FormEvent, useEffect, useState } from 'react';
import { Input } from '../../../components/Input';
import OrSeparator from '../../../components/OrSeparator';
import ContinueWithGoogle from '../../../components/ContinueWithGoogle/ContinueWithGoogle';
import { isEmailVaild } from '../../../firebase/auth';
import { LoginFormProps } from './TypesLogin';

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

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError(null);
    setPassError(null);

    if (!isEmailVaild(email, setEmailError) || !isPassValid()) {
      return;
    }

    onSubmit(email, password);
  };

  const onBlurHandlerEmail = () => {
    if (email) isEmailVaild(email, setEmailError);
  };
  return (
    <form
      onSubmit={(e) => {
        onSubmitHandler(e);
      }}
      aria-labelledby="Login form"
      className="grid gap-1 text-sm font-mono"
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

export default LoginForm;
