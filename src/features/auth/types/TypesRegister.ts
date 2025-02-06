export interface RegisterFormProps {
  onSubmit: (email: string, username: string, password: string) => void;
  authError: any;
}
