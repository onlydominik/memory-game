import { useEffect } from 'react';
import { UseRefTimeout } from '../types';
import {
  GameSessionState,
  GameSessionDispatch,
} from '../reducers/gameSessionReducer/gameSessionReducerTypes';
import { GameDispatch } from '../reducers/gameReducer/gameReducerTypes';
import { Challenge, GameContextStateValue } from '../types';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../services/firebase/firebase';
import { saveAnonymousHighscore } from '../services/localStorage/anonymousHighscores';
import { CARD_HIDE_DELAY } from '../utils/constants';

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
  const calculateMedalScore = (
    time: number,
    medalTtimeLimits: Challenge['medalTimeLimits']
  ) => {
    if (time <= medalTtimeLimits.gold) return 3;
    if (time <= medalTtimeLimits.silver) return 2;
    if (time <= medalTtimeLimits.bronze) return 1;
    return 0;
  };

  const handleMatchedCards = (
    firstCard: GameSessionState['flippedCards'][0],
    secondCard: GameSessionState['flippedCards'][0]
  ) => {
    if (firstCard.id === secondCard.id) {
      gameSessionDispatch({
        type: 'SET_MATCHED_CARD',
        payload: firstCard.id,
      });
      return true;
    }
    return false;
  };

  const handleUnmatchedCards = () => {
    timeout.current = setTimeout(() => {
      gameSessionDispatch({ type: 'RESET_FLIPPED_CARDS' });
    }, CARD_HIDE_DELAY);
  };

  useEffect(() => {
    if (gameSessionState.flippedCards.length === 2) {
      const [firstCard, secondCard] = gameSessionState.flippedCards;
      if (!handleMatchedCards(firstCard, secondCard)) handleUnmatchedCards();
      gameSessionDispatch({ type: 'SET_MOVE' });
    }
  }, [gameSessionState.flippedCards, gameSessionDispatch]);

  useEffect(() => {
    const isGameComplete =
      activeChallenge &&
      gameSessionState.matchedCards.length === activeChallenge.uniqueCards / 2;

    if (isGameComplete)
      gameSessionDispatch({ type: 'SET_GAME_STATUS', payload: 'win' });
  }, [gameSessionState.matchedCards, activeChallenge, gameSessionDispatch]);

  useEffect(() => {
    if (
      gameSessionState.gameStatus &&
      gameSessionState.time &&
      activeChallenge?.medalTimeLimits
    ) {
      const medalScore = calculateMedalScore(
        gameSessionState.time,
        activeChallenge.medalTimeLimits
      );

      const newHighscore = {
        username: gameCoreState.currentUser.username,
        difficulty,
        time: gameSessionState.time,
        moves: gameSessionState.moves,
        missed: gameSessionState.missed,
        medalScore,
      };

      if (gameCoreState.currentUser.isAnonymous) {
        saveAnonymousHighscore({
          username: 'Guest',
          difficulty,
          time: gameSessionState.time,
          moves: gameSessionState.moves,
          missed: gameSessionState.missed,
          medalScore: medalScore,
          date: Date.now(),
        });
        return;
      }

      gameCoreDispatch({
        type: 'SET_HIGHSCORES',
        payload: newHighscore,
      });

      const addHighscoretoFirestore = async () => {
        try {
          const difficultyRef = doc(db, 'highscores', difficulty);
          const fieldValue = `${difficulty}Scores`;

          const snapshot = await getDoc(difficultyRef);
          const currentHighscores = snapshot.exists()
            ? snapshot.data()[fieldValue] || []
            : [];

          const newHighscoreDestruct = { ...newHighscore };
          const updatedHighscores = [...currentHighscores, newHighscoreDestruct]
            .sort((a, b) => {
              if (a.moves === b.moves) {
                return a.time - b.time;
              }
              return a.moves - b.moves;
            })
            .slice(0, 10);

          await updateDoc(difficultyRef, {
            [fieldValue]: updatedHighscores,
          });
        } catch (error) {
          console.error('Error adding highscore:', error);
        }
      };

      addHighscoretoFirestore();
    }
  }, [gameSessionState.gameStatus, gameSessionState.time]);
};

export { useGameLogic };
