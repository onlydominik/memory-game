export interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  authError: any;
  isSigningIn: boolean;
}
