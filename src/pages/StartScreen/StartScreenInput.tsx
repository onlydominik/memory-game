import { InputProps } from '../../types';

export const Input = ({
  value,
  id,
  onChange,
  onBlur,
  onFocus,
  error,
}: InputProps) => {
  return (
    <div>
      <input
        className={`min-h-10 font-sans font-bold indent-4 border-solid border-[0.1rem] rounded-3xl ${
          error
            ? 'border-accentRed focus-visible:outline-accentRed'
            : 'border-gray focus:outline-dark focus:outline-offset-1'
        }`}
        value={value}
        id={id}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        autoComplete="on"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error ? (
        <p
          className="mt-2 font-sans text-xs sm:text-sm text-center text-accentRed"
          id={`${id}-error`}
        >
          {error}
        </p>
      ) : (
        <div className="h-6 sm:h-7"></div>
      )}
    </div>
  );
};
