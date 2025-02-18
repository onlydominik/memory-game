import { useEffect, useCallback } from 'react';
import {
  GameSessionDispatch,
  GameSessionState,
} from '@reducers/gameSessionReducer/gameSessionReducerTypes';
import { CARD_HIDE_DELAY } from '@utils/constants';
import type { UseRefTimeout } from '@typings/index';

interface UseCardMatchingProps {
  gameSessionState: GameSessionState;
  gameSessionDispatch: GameSessionDispatch;
  timeout: UseRefTimeout;
}

export const useCardMatching = ({
  gameSessionState,
  gameSessionDispatch,
  timeout,
}: UseCardMatchingProps) => {
  const areCardsMatched = useCallback(
    (
      firstCard: { id: number; index: number },
      secondCard: { id: number; index: number }
    ): boolean => {
      return firstCard.id === secondCard.id;
    },
    []
  );

  useEffect(() => {
    const isTwoCardsFlipped = gameSessionState.flippedCards.length === 2;

    if (isTwoCardsFlipped) {
      const [firstCard, secondCard] = gameSessionState.flippedCards;

      const handleCardMatch = () => {
        gameSessionDispatch({
          type: 'SET_MATCHED_CARD',
          payload: firstCard.id,
        });
      };

      const handleUnmatchedCards = () => {
        timeout.current = setTimeout(() => {
          gameSessionDispatch({ type: 'RESET_FLIPPED_CARDS' });
        }, CARD_HIDE_DELAY);
      };

      const updateMove = () => {
        gameSessionDispatch({ type: 'SET_MOVE' });
      };

      if (areCardsMatched(firstCard, secondCard)) {
        handleCardMatch();
      } else {
        handleUnmatchedCards();
      }

      updateMove();
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [
    gameSessionState.flippedCards,
    gameSessionDispatch,
    timeout,
    areCardsMatched,
  ]);

  const handleCardClick = useCallback(
    (index: number, id: number) => {
      if (gameSessionState.gameStatus === 'pending') {
        gameSessionDispatch({ type: 'SET_GAME_STATUS', payload: 'inProgress' });
      }

      gameSessionDispatch({
        type: 'SET_FLIPPED_CARD',
        payload: { index, id },
      });
    },
    [gameSessionState.gameStatus, gameSessionDispatch]
  );

  return { handleCardClick };
};
