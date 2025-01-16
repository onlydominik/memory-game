import { useEffect } from 'react';
import { pushData } from '../pages/GamePanel/GameLogicUtils';
import { UseRefTimeout } from '../types';
import {
  GameSessionState,
  GameSessionDispatch,
} from '../reducer/gameSessionReducer/gameSessionReducerTypes';
import { GameDispatch } from '../reducer/gameReducer/gameReducerTypes';
import { Challenge, GameContextStateValue } from '../types';

interface UseGameLogicProps {
  gameSessionState: GameSessionState;
  gameSessionDispatch: GameSessionDispatch;
  activeChallenge: Challenge | undefined;
  gameCoreDispatch: GameDispatch;
  gameCoreState: GameContextStateValue;
  difficulty: Challenge['difficulty'];
  timeout: UseRefTimeout;
}

const useGameLogic = ({
  gameSessionState,
  gameSessionDispatch,
  activeChallenge,
  gameCoreDispatch,
  gameCoreState,
  difficulty,
  timeout,
}: UseGameLogicProps) => {
  useEffect(() => {
    if (gameSessionState.flippedCards.length === 2) {
      const [firstCard, secondCard] = gameSessionState.flippedCards;
      if (firstCard.id === secondCard.id) {
        gameSessionDispatch({
          type: 'SET_MATCHED_CARD',
          payload: firstCard.id,
        });
      } else {
        timeout.current = setTimeout(() => {
          gameSessionDispatch({ type: 'RESET_FLIPPED_CARDS' });
        }, 1500);
      }
      gameSessionDispatch({ type: 'SET_MOVE' });
    }
  }, [gameSessionState.flippedCards, gameSessionDispatch]);

  useEffect(() => {
    if (
      activeChallenge &&
      gameSessionState.matchedCards.length === activeChallenge.uniqueCards / 2
    ) {
      gameSessionDispatch({ type: 'SET_GAME_STATUS', payload: 'win' });
    }
  }, [gameSessionState.matchedCards, activeChallenge, gameSessionDispatch]);

  useEffect(() => {
    if (
      gameSessionState.gameStatus &&
      gameSessionState.time &&
      activeChallenge?.medalTimeLimits
    ) {
      const calculateMedalScore = (
        time: number,
        medalTtimeLimits: Challenge['medalTimeLimits']
      ) => {
        if (time <= medalTtimeLimits.gold) return 3;
        if (time <= medalTtimeLimits.silver) return 2;
        if (time <= medalTtimeLimits.bronze) return 1;
        return 0;
      };
      const medalScore = calculateMedalScore(
        gameSessionState.time,
        activeChallenge.medalTimeLimits
      );
      gameCoreDispatch({
        type: 'SET_HIGHSCORES',
        payload: {
          username: gameCoreState.currentUser.username,
          difficulty,
          time: gameSessionState.time,
          moves: gameSessionState.moves,
          missed: gameSessionState.missed,
          medalScore,
        },
      });
    }
  }, [gameSessionState.gameStatus, gameSessionState.time]);
  useEffect(() => {
    if (gameSessionState.gameStatus === 'win')
      pushData(gameCoreState.highscores);
  }, [gameCoreState.highscores]);
};

export { useGameLogic };
