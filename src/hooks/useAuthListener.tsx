import { useEffect, useState } from 'react';
import { auth } from '@services/firebase/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

const useAuthListener = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setUserLoggedIn(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { currentUser, userLoggedIn, isLoading };
};

export { useAuthListener };
