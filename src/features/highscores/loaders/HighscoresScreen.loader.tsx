import { collection, getDocs } from 'firebase/firestore';
import { db } from '@services/firebase/firebase';
import { Highscore, HighscoresByChallenge } from '@typings/index';

interface HighscoreDocument {
  easyScores?: Highscore[];
  mediumScores?: Highscore[];
  hardScores?: Highscore[];
}

/**
 * Loads highscores from Firestore collection
 * @returns {Promise<HighscoresByChallenge>} Object containing highscores by difficulty
 * @throws {Error} If loading fails
 */

const loader = async (): Promise<HighscoresByChallenge> => {
  try {
    const highscoresCollection = collection(db, 'highscores');
    const highscoresSnapshot = await getDocs(highscoresCollection);

    if (highscoresSnapshot.empty) {
      return { easy: [], medium: [], hard: [] };
    }

    const highscores: HighscoresByChallenge = {
      easy: highscoresSnapshot.docs
        .filter((doc) => {
          const data = doc.data() as HighscoreDocument;
          return Array.isArray(data.easyScores);
        })
        .map((doc) => (doc.data() as HighscoreDocument).easyScores!)
        .flat(),
      medium: highscoresSnapshot.docs
        .filter((doc) => {
          const data = doc.data() as HighscoreDocument;
          return Array.isArray(data.mediumScores);
        })
        .map((doc) => (doc.data() as HighscoreDocument).mediumScores!)
        .flat(),
      hard: highscoresSnapshot.docs
        .filter((doc) => {
          const data = doc.data() as HighscoreDocument;
          return Array.isArray(data.hardScores);
        })
        .map((doc) => (doc.data() as HighscoreDocument).hardScores!)
        .flat(),
    };

    return highscores;
  } catch (error) {
    console.error('Error loading highscores:', error);
    throw error;
  }
};

export { loader };
