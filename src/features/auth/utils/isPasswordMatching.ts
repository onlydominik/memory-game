const isPasswordMatching = (
  password: string,
  confirmPassword: string,
  setErrorFunc: (value: React.SetStateAction<string | null>) => void
): boolean => {
  if (password !== confirmPassword) {
    setErrorFunc('Passwords do not match');
    return false;
  }
  return true;
};

export { isPasswordMatching };
