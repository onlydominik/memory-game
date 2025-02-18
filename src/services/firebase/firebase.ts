import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import type {
  Challenge,
  Challenges,
  Highscore,
  HighscoresByChallenge,
} from '@typings/index';

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

export const db: Firestore = getFirestore(app);
export { auth };

// firestore utils functions
export const fetchChallenges = async (): Promise<Challenges> => {
  const challengesCollection = collection(db, 'challenges');
  const snapshot = await getDocs(challengesCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Challenges;
};

export const fetchHighscores = async (): Promise<HighscoresByChallenge> => {
  const highscoresCollection = collection(db, 'highscores');
  const snapshot = await getDocs(highscoresCollection);
  return {
    easy: snapshot.docs
      .filter((doc) => doc.data()['easyScores'])
      .map((doc) => doc.data().easyScores)
      .flat(),
    medium: snapshot.docs
      .filter((doc) => doc.data()['mediumScores'])
      .map((doc) => doc.data().mediumScores)
      .flat(),
    hard: snapshot.docs
      .filter((doc) => doc.data()['hardScores'])
      .map((doc) => doc.data().hardScores)
      .flat(),
  };
};

export const addHighscoreToFirestoreAndReturnUpdatedHighscores = async (
  difficulty: Challenge['difficulty'],
  newHighscore: Highscore,
  sortHighscoresFunc: (a: Highscore, b: Highscore) => number
) => {
  try {
    const { doc, getDoc, updateDoc } = await import('firebase/firestore');
    const difficultyRef = doc(db, 'highscores', difficulty);
    const fieldValue = `${difficulty}Scores`;

    const snapshot = await getDoc(difficultyRef);
    const currentHighscores: Highscore[] = snapshot.exists()
      ? snapshot.data()[fieldValue] || []
      : [];

    const newHighscoreDestruct = { ...newHighscore };
    const updatedHighscores = [...currentHighscores, newHighscoreDestruct]
      .sort(sortHighscoresFunc)
      .slice(0, 10);

    await updateDoc(difficultyRef, {
      [fieldValue]: updatedHighscores,
    });
    return updatedHighscores;
  } catch (error) {
    console.error('Error adding highscore:', error);
  }
};
