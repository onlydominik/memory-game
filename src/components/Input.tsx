import { InputProps } from '../types';

export const Input = ({
  value,
  id,
  type,
  onChange,
  onBlur,
  onFocus,
  error,
  ...props
}: InputProps) => {
  return (
    <div>
      <input
        className={`min-h-[3rem] w-full font-sans font-bold indent-4 border-solid border-[0.08rem] focus:outline-none focus-visible:outline-white focus-visible:outline-solid ring-0 text-white bg-white/10 rounded-md ${
          error
            ? 'border-accentRed focus-visible:outline-accentRed'
            : 'border-gray/80 hover:border-white'
        }`}
        value={value}
        type={type}
        id={id}
        name={id}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        autoComplete="on"
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error ? (
        <p
          className="mt-1 font-sans text-xs sm:text-sm text-accentRed"
          id={`${id}-error`}
        >
          {error}
        </p>
      ) : (
        <div className="h-6 sm:h-6"></div>
      )}
    </div>
  );
};
