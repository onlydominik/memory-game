const validateEmail = async (
  value: string,
  setErrorFunc: (value: React.SetStateAction<string | null>) => void
): Promise<boolean> => {
  try {
    const { isEmailValid } = await import('@services/firebase/auth');
    const isValid = isEmailValid(value);

    if (!isValid) {
      setErrorFunc('Please enter a valid email address');
      return false;
    }

    setErrorFunc(null);
    return true;
  } catch (error) {
    setErrorFunc('Error validating email');
    console.error(error);
    return false;
  }
};

export { validateEmail };
