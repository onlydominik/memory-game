import { useLoaderData, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import { Images } from '../../types';
import PlayAreaCard from './PlayAreaCard';
import styles from './PlayArea.module.css';
const PlayArea = () => {
  const { difficulty } = useParams();
  const images: Images = useLoaderData();
  const context = useContext(GameContext);
  const challenges = context?.state.challenges ?? [];

  const activeChallenge = challenges.find(
    (challenge) => challenge.difficulty === difficulty
  );

  const random = (): number => {
    return Math.floor(Math.random() * 21);
  };

  let tablica: number[] = [];

  const generateIdForImages = (): void => {
    if (!activeChallenge) return;
    tablica = [];
    const uniqueCardsSet = new Set<number>();

    while (uniqueCardsSet.size < activeChallenge.uniqueCards / 2) {
      const randomNumber = random();
      uniqueCardsSet.add(randomNumber);
    }

    tablica = Array.from(uniqueCardsSet);
    tablica = [...tablica, ...tablica];
  };

  const shuffleArray = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  generateIdForImages();

  tablica = shuffleArray(tablica);
  console.log(tablica);

  const uniqueImages = tablica.map((c) => {
    return images[c];
  });

  let levelClass = '';
  if (activeChallenge?.uniqueCards === 12) {
    levelClass = styles.easy;
  } else if (activeChallenge?.uniqueCards === 24) {
    levelClass = styles.medium;
  } else if (activeChallenge?.uniqueCards === 42) {
    levelClass = styles.hard;
  }
  console.log(levelClass);

  return (
    <main className={`${styles.playAreaMain} ${levelClass}`}>
      {uniqueImages.map((image) => {
        return <PlayAreaCard imageUrl={image.path} color={image.color} />;
      })}
    </main>
  );
};

export default PlayArea;
