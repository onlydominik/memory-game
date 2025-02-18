import { useEffect, useRef } from 'react';
import { saveAnonymousHighscore } from '@services/localStorage/anonymousHighscores';
import {
  GameSessionDispatch,
  GameSessionState,
} from '@reducers/gameSessionReducer/gameSessionReducerTypes';
import { GameCoreDispatch } from '@reducers/gameReducer/gameReducerTypes';
import { addHighscoreToFirestoreAndReturnUpdatedHighscores } from '@services/firebase/firebase';
import { sortHighscores } from '@utils/sortHighscores';
import type {
  Challenge,
  GameContextStateValue,
  Highscore,
} from '@typings/index';

interface UseGameWinProps {
  gameSessionState: GameSessionState;
  gameSessionDispatch: GameSessionDispatch;
  gameCoreState: GameContextStateValue;
  gameCoreDispatch: GameCoreDispatch;
  activeChallenge: Challenge;
}

export const useGameWin = ({
  gameSessionState,
  gameSessionDispatch,
  gameCoreState,
  gameCoreDispatch,
  activeChallenge,
}: UseGameWinProps) => {
  const hasProcessedWin = useRef(false);

  const calculateMedalScore = (
    time: number,
    medalTimeLimits: Challenge['medalTimeLimits']
  ) => {
    if (time <= medalTimeLimits.gold) return 3;
    if (time <= medalTimeLimits.silver) return 2;
    if (time <= medalTimeLimits.bronze) return 1;
    return 0;
  };

  // Check if game is complete after match
  useEffect(() => {
    const isGameComplete =
      gameSessionState.matchedCards.length === activeChallenge.uniqueCards / 2;

    if (isGameComplete && gameSessionState.gameStatus !== 'win') {
      gameSessionDispatch({
        type: 'SET_GAME_STATUS',
        payload: 'win',
      });
    }
  }, [
    gameSessionState.matchedCards.length,
    activeChallenge.uniqueCards,
    gameSessionDispatch,
    gameSessionState.gameStatus,
  ]);

  // Handle win
  useEffect(() => {
    if (
      !hasProcessedWin.current &&
      gameSessionState.gameStatus === 'win' &&
      gameSessionState.time
    ) {
      const { time, missed, moves } = gameSessionState;
      const { isAnonymous, username } = gameCoreState.currentUser;

      const newHighscore: Highscore = {
        username: username || 'Anonymous',
        difficulty: activeChallenge.difficulty,
        time,
        moves,
        missed,
        medalScore: calculateMedalScore(time, activeChallenge.medalTimeLimits),
        date: new Date(),
      };

      if (isAnonymous) {
        saveAnonymousHighscore({ ...newHighscore, username: 'Guest' });
      } else {
        addHighscoreToFirestoreAndReturnUpdatedHighscores(
          activeChallenge.difficulty,
          newHighscore,
          sortHighscores
        ).then((newHighscores) => {
          gameCoreDispatch({
            type: 'SET_HIGHSCORES_BY_DIFFICULTY',
            payload: {
              difficulty: activeChallenge.difficulty,
              newHighscores: newHighscores || [],
            },
          });
        });
      }

      hasProcessedWin.current = true;
    }
  }, [
    gameSessionState,
    gameCoreDispatch,
    gameCoreState.currentUser,
    activeChallenge.medalTimeLimits,
    activeChallenge.difficulty,
  ]);

  return null;
};
