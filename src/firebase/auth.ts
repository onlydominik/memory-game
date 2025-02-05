import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';
import { ANONYMOUS_HIGHSCORES_KEY } from '../services/localStorage/anonymousHighscores';

export const doCreateUserWithEmailAndPassword = async (
  email: any,
  password: any
) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (
  email: any,
  password: any
) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

export const doSignInAnonymously = async () => {
  const result = await signInAnonymously(auth);
  if (!localStorage.getItem(ANONYMOUS_HIGHSCORES_KEY)) {
    localStorage.setItem(
      ANONYMOUS_HIGHSCORES_KEY,
      JSON.stringify({ easy: [], medium: [], hard: [] })
    );
  }
  return result;
};

export const doSignOut = () => {
  return auth.signOut();
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmailVaild = (email: string, setErrorFunc: any) => {
  if (!emailRegex.test(email)) {
    setErrorFunc('Invalid email address');
    return false;
  }
  return true;
};
