import { useState } from 'react';
import { Input } from './StartScreenInput';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateUsername = (value: string): string | null => {
    if (value.length < 3 || value.length > 18) {
      return 'Username must be between 3 and 18 characters long';
    } else if (value.includes(' ')) {
      return 'Username must not contain spaces';
    }
    return null;
  };

  const onChangeHandler = (value: string): void => setEmail(value);
  const onChangeHandlerPass = (value: string): void => setPassword(value);

  const onBlurHandler = (): void => setError(validateUsername(email));
  const onBlurHandlerPass = (): void => {
    return;
  };

  const onFocusHandler = (): void => setError(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(email, password);
      }}
      aria-labelledby="Username Entry Form"
      className="grid justify-items-center gap-20 py-14 text-center rounded-b-3xl bg-startScreen-bg">
      <h2 id="Username Entry Form" className="sr-only">
        Enter your username
      </h2>
      <div className="grid justify-items-center gap-2">
        <label
          className="mb-2 text-xl sm:text-2xl text-startScreen-text"
          htmlFor="username">
          What do your brain cells call you?
        </label>
        <Input
          id="email"
          value={email}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          error={error || null}
        />
        <Input
          id="password"
          value={password}
          onChange={onChangeHandlerPass}
          onBlur={onBlurHandlerPass}
          onFocus={onFocusHandler}
          error={error || null}
        />
        {false && (
          <div
            className="mt-2 py-4 px-4 font-sans bg-gray text-accentRed"
            role="alert"
            aria-live="assertive">
            <p className="font-bold"></p>
            <p>If the problem persists, please contact the administrator.</p>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="px-20 py-4 text-2xl rounded-[4rem] text-startScreen-link-text bg-startScreen-link-bg">
        PLAY
      </button>
    </form>
  );
};

export default LoginForm;
