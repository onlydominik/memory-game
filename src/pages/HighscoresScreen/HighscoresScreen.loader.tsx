import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { HighscoresByChallenge } from '../../types';

const loader = async () => {
  const highscoresCollection = collection(db, 'highscores');
  const highscoresSnapshot = await getDocs(highscoresCollection);
  const highscores: HighscoresByChallenge = {
    easy: highscoresSnapshot.docs
      .filter((doc) => doc.data()['easyScores'])
      .map((doc) => doc.data().easyScores)
      .flat(),
    medium: highscoresSnapshot.docs
      .filter((doc) => doc.data()['mediumScores'])
      .map((doc) => doc.data().mediumScores)
      .flat(),
    hard: highscoresSnapshot.docs
      .filter((doc) => doc.data()['hardScores'])
      .map((doc) => doc.data().hardScores)
      .flat(),
  };
  return highscores;
};

export { loader };
