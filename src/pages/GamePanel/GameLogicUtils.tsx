import { Challenge } from '../../types';

const random = (): number => {
  return Math.floor(Math.random() * 21);
};

const shuffleArray = (array: number[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const generateIdForImages = (
  generateRandomNumber: () => number,
  shuffleArray: (array: number[]) => number[],
  activeChallenge: Challenge | undefined
): number[] => {
  if (!activeChallenge) return [];

  const uniqueCardsSet = new Set<number>();

  while (uniqueCardsSet.size < activeChallenge.uniqueCards / 2) {
    const randomNumber = generateRandomNumber();
    uniqueCardsSet.add(randomNumber);
  }

  let newTable = Array.from(uniqueCardsSet);
  newTable = [...newTable, ...newTable];
  return shuffleArray(newTable);
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};
export { random, shuffleArray, generateIdForImages, formatTime };
