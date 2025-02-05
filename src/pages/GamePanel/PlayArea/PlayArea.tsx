import { useLoaderData, useParams } from 'react-router-dom';
import { useMemo, useRef, useState, useEffect } from 'react';
import { useGame } from '../../../context/GameContext';
import { Challenge, Images, TimeoutId, UseRefTimeout } from '../../../types';
import PlayAreaCard from './PlayAreaCard';
import styles from './PlayArea.module.css';
import { random, shuffleArray, generateIdForImages } from '../GameLogicUtils';
import GameWinModal from '../../../components/GameWinModal/GameWinModal';
import { useGameLogic } from '../../../hooks/useGameLogic';
import {
  GameSessionState,
  GameSessionDispatch,
} from '../../../reducer/gameSessionReducer/gameSessionReducerTypes';
import questionMark from '../../../../public/icons/question-mark.png';
import Loader from '../../../components/Loader/Loader';

const PlayArea = ({
  gameSessionState,
  gameSessionDispatch,
}: {
  gameSessionState: GameSessionState;
  gameSessionDispatch: GameSessionDispatch;
}) => {
  const { difficulty } = useParams<{ difficulty: Challenge['difficulty'] }>();
  const images: Images = useLoaderData();
  const { state: gameCoreState, dispatch: gameCoreDispatch } = useGame();
  const timeout: UseRefTimeout = useRef<TimeoutId>();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const challenges = gameCoreState.challenges ?? [];
  const activeChallenge = challenges.find(
    (challenge) => challenge.difficulty === difficulty
  );

  if (difficulty)
    useGameLogic({
      gameSessionState,
      gameSessionDispatch,
      activeChallenge,
      gameCoreDispatch,
      gameCoreState,
      difficulty,
      timeout,
    });

  const handleClick = (index: number, id: number) => {
    if (gameSessionState.gameStatus === 'pending') {
      gameSessionDispatch({ type: 'SET_GAME_STATUS', payload: 'inProgress' });
    }
    if (gameSessionState.flippedCards.some((card) => card.index === index)) {
      return;
    }
    gameSessionDispatch({ type: 'SET_FLIPPED_CARD', payload: { index, id } });
    clearTimeout(timeout.current);
  };

  const cards = useMemo(() => {
    const uniqueCardsSet: number[] = generateIdForImages(
      random,
      (array) => shuffleArray(array),
      activeChallenge
    );
    return uniqueCardsSet.map((id) => images[id]);
  }, [activeChallenge, images]);

  const levelClass = useMemo(() => {
    switch (activeChallenge?.difficulty) {
      case 'easy':
        return styles.easy;
      case 'medium':
        return styles.medium;
      case 'hard':
        return styles.hard;
      default:
        return '';
    }
  }, [activeChallenge]);

  useEffect(() => {
    if (!cards.length) return;

    const imagePromises = cards.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.path;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    const questionMarkPromise = new Promise((resolve, reject) => {
      const img = new Image();
      img.src = questionMark;
      img.onload = resolve;
      img.onerror = reject;
    });

    Promise.all([...imagePromises, questionMarkPromise])
      .then(() => setImagesLoaded(true))
      .catch(console.error);
  }, [cards]);

  if (gameCoreState.isLoading || !imagesLoaded) {
    return <Loader size="lg" color="light" className="mt-20" />;
  }

  return (
    <main className={`${styles.playAreaMain} ${levelClass}`}>
      {gameSessionState.gameStatus === 'win' ? (
        <GameWinModal gameSessionState={gameSessionState} />
      ) : (
        cards.map((image, index) => (
          <PlayAreaCard
            key={`card-${index}-${image.id}`}
            id={image.id}
            path={image.path}
            color={image.color}
            handleClick={() => handleClick(index, image.id)}
            isMatched={gameSessionState.matchedCards.includes(image.id)}
            isFlipped={gameSessionState.flippedCards.some(
              (card) => card.index === index
            )}
          />
        ))
      )}
    </main>
  );
};

PlayArea.displayName = 'PlayArea';

export default PlayArea;
