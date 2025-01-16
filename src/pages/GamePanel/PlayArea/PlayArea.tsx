import { useLoaderData, useParams } from 'react-router-dom';
import { useMemo, useRef } from 'react';
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
    if (gameSessionState.gameStatus === 'pending')
      gameSessionDispatch({ type: 'SET_GAME_STATUS', payload: 'inProgress' });
    if (gameSessionState.flippedCards.some((card) => card.index === index))
      return;

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
            isFlipped={
              gameSessionState.flippedCards.some(
                (card) => card.index === index
              ) || gameSessionState.matchedCards.includes(image.id)
            }
          />
        ))
      )}
    </main>
  );
};

PlayArea.displayName = 'PlayArea';

export default PlayArea;
