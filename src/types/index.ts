export type InputProps = {
  value: string;
  id: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string | null;
};
