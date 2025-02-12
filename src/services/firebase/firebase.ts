import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBy5maFoJX7ORw0nvZOmNMsbh6kI8r7ue0',
  authDomain: 'mind-meld-c7667.firebaseapp.com',
  databaseURL:
    'https://mind-meld-c7667-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'mind-meld-c7667',
  storageBucket: 'mind-meld-c7667.firebasestorage.app',
  messagingSenderId: '1084412617553',
  appId: '1:1084412617553:web:310cc98c618c6cec50a970',
  measurementId: 'G-M1F44PCJ5L',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const db: any = getFirestore(app);
export { auth };
