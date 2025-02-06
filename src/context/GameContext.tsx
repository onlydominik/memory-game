import { createContext, useReducer, useEffect, useContext } from 'react';
import { gameReducer, initialState } from '../reducers/gameReducer/gameReducer';
import {
  Challenges,
  GameContextStateValue,
  HighscoresByChallenge,
} from '../types';
import { GameDispatch } from '../reducers/gameReducer/gameReducerTypes';
import { useAuth } from '../hooks/useAuth';

interface GameContextType {
  state: GameContextStateValue;
  dispatch: GameDispatch;
}

interface CurrentUserData {
  username: string;
  isAnonymous: boolean;
}
const GameContext = createContext<GameContextType | null>(null);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { currentUser } = useAuth();
  const currentUserData: CurrentUserData = {
    username: currentUser?.displayName || null,
    isAnonymous: currentUser?.isAnonymous || false,
  };

  useEffect(() => {
    const fetchFireStoreData = async () => {
      try {
        const { collection, getDocs } = await import('firebase/firestore');
        const { db } = await import('../services/firebase/firebase');

        const challengesCollection = collection(db, 'challenges');
        const highscoresCollection = collection(db, 'highscores');
        const [challengesSnapshot, highscoresSnapshot] = await Promise.all([
          getDocs(challengesCollection),
          getDocs(highscoresCollection),
        ]);

        const challenges = challengesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Challenges;

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

        dispatch({
          type: 'SET_ALL_DATA',
          payload: {
            currentUser: currentUserData,
            highscores,
            challenges,
            isLoading: false,
          },
        });
      } catch (err) {
        console.error('Failed to fetch data:', err);
      }
    };
    fetchFireStoreData();
  }, [currentUser]);
  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};

export { GameContext, GameProvider };
