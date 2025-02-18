const validatePasswordLength = (
  password: string,
  setErrorFunc: (value: React.SetStateAction<string | null>) => void
): boolean => {
  if (password.length < 6) {
    setErrorFunc('Password must be at least 6 characters');
    return false;
  }
  return true;
};

export { validatePasswordLength };
