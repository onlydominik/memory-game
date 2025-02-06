import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';
import { ANONYMOUS_HIGHSCORES_KEY } from '../../utils/constants';

interface AuthError extends Error {
  code: string;
}

const initializeAnonymousStorage = () => {
  localStorage.setItem(
    ANONYMOUS_HIGHSCORES_KEY,
    JSON.stringify({ easy: [], medium: [], hard: [] })
  );
};

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const authError = error as AuthError;
    console.error('Create user error: ', authError);
    throw authError;
  }
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const authError = error as AuthError;
    console.error('Sign in error:', authError.code);
    throw authError;
  }
};

export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    window.location.href = '/';
    return result;
  } catch (error) {
    const authError = error as AuthError;
    console.error('Google sign in error:', authError.code);
    throw authError;
  }
};

export const doSignInAnonymously = async () => {
  try {
    const result = await signInAnonymously(auth);
    if (!localStorage.getItem(ANONYMOUS_HIGHSCORES_KEY)) {
      initializeAnonymousStorage();
    }
    return result;
  } catch (error) {
    const authError = error as AuthError;
    console.error('Anonymous sign in error:', authError.code);
    throw authError;
  }
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
