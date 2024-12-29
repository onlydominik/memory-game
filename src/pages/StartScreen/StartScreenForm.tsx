import { useState } from 'react';
import { Input } from './StartScreenInput';
import { Form, useActionData } from 'react-router-dom';

const StartScreenForm = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);
  const actionError = useActionData<{ statusText: string }>();

  const validateUsername = (value: string): string | null => {
    if (value.length < 3 || value.length > 18) {
      return 'Username must be between 3 and 18 characters long';
    } else if (value.includes(' ')) {
      return 'Username must not contain spaces';
    }
    return null;
  };

  const onChangeHandler = (value: string): void => setUsername(value);

  const onBlurHandler = (): void => setError(validateUsername(username));

  const onFocusHandler = (): void => setError(null);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>): void => {
    const validationError = validateUsername(username);

    if (validationError) {
      event.preventDefault();
      setError(validationError);
    } else {
      setError(null);
      console.log('Form submitted successfully:', { username });
    }
  };

  return (
    <Form
      method="post"
      onSubmit={onSubmitHandler}
      aria-labelledby="Username Entry Form"
      className="grid justify-items-center gap-20 py-14 text-center rounded-b-3xl bg-startScreen-bg"
    >
      <h2 id="Username Entry Form" className="sr-only">
        Enter your username
      </h2>
      <div className="grid justify-items-center gap-2">
        <label
          className="mb-2 text-xl sm:text-2xl text-startScreen-text"
          htmlFor="username"
        >
          What do your brain cells call you?
        </label>
        <Input
          id="username"
          value={username}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
          error={error || null}
        />
        {actionError?.statusText && (
          <div
            className="mt-2 py-4 px-4 font-sans bg-gray text-accentRed"
            role="alert"
            aria-live="assertive"
          >
            <p className="font-bold">{actionError.statusText}</p>
            <p>If the problem persists, please contact the administrator.</p>
          </div>
        )}
      </div>
      <button
        type="submit"
        className="px-20 py-4 text-2xl rounded-[4rem] text-startScreen-link-text bg-startScreen-link-bg"
      >
        PLAY
      </button>
    </Form>
  );
};

export default StartScreenForm;
