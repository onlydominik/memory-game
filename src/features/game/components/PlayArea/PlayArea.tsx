import { useMemo, useRef } from 'react';

// Components
import PlayAreaCard from '../PlayAreaCard';
import { GameWinModal } from '@components/GameWinModal/GameWinModal';

// Types
import type {
  Challenge,
  Images,
  TimeoutId,
  UseRefTimeout,
} from '@typings/index';
import type {
  GameSessionState,
  GameSessionDispatch,
} from '@reducers/gameSessionReducer/gameSessionReducerTypes';

// Utils
import {
  random,
  generateIdForImages,
  shuffleArray,
} from '../../services/shuffleUtils';

// Hooks
import { useCardMatching } from '@hooks/useCardMatching';
import { useGameWin } from '@hooks/useGameWin';
import { useGameContext } from '@hooks/useGameContext';

// Styles and assets
import styles from './styles.module.css';
import { useLoaderData } from 'react-router-dom';

interface PlayAreaProps {
  gameSessionState: GameSessionState;
  gameSessionDispatch: GameSessionDispatch;
  activeChallenge: Challenge;
}

const PlayArea: React.FC<PlayAreaProps> = ({
  gameSessionState,
  gameSessionDispatch,
  activeChallenge,
}) => {
  const timeout: UseRefTimeout = useRef<TimeoutId>();
  const images: Images = useLoaderData();
  const { state: gameCoreState, dispatch: gameCoreDispatch } = useGameContext();

  const { handleCardClick } = useCardMatching({
    gameSessionState,
    gameSessionDispatch,
    timeout,
  });

  useGameWin({
    gameSessionState,
    gameSessionDispatch,
    gameCoreState,
    gameCoreDispatch,
    activeChallenge,
  });

  const handleClick = (index: number, id: number) => {
    handleCardClick(index, id);
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

  if (gameCoreState.isLoading || !cards.length)
    return <div className="text-6xl">asdasdasdasd</div>;
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
            isWrong={
              gameSessionState.flippedCards.some(
                (card) => card.index === index
              ) && gameSessionState.flippedCards.length > 1
            }
            className={!gameCoreState.isLoading ? '' : 'invisible'}
          />
        ))
      )}
    </main>
  );
};

PlayArea.displayName = 'PlayArea';

export { PlayArea };
