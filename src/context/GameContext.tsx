import { createContext, useReducer, useEffect, useContext } from 'react';
import { gameReducer, initialState } from '../reducer/gameReducer/gameReducer';
import { Challenges, GameContextStateValue } from '../types';
import { GameDispatch } from '../reducer/gameReducer/gameReducerTypes';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../hooks/useAuth';

interface GameContextType {
  state: GameContextStateValue;
  dispatch: GameDispatch;
}

const GameContext = createContext<GameContextType | null>(null);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const challengesCollection = collection(db, 'challenges');
  const highscoresCollection = collection(db, 'highscores');
  const { currentUser } = useAuth();
  const currentUserUsername = { username: currentUser.displayName };

  useEffect(() => {
    const fetchFireStoreData = async () => {
      try {
        const challengesSnapshot = await getDocs(challengesCollection);
        const highscoresSnapshot = await getDocs(highscoresCollection);
        const challenges: Challenges = challengesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Challenges;

        const highscores: any = {
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
            currentUser: currentUserUsername || 'Anonim',
            highscores: highscores,
            challenges: challenges,
            isLoading: false,
          },
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchFireStoreData();
  }, []);
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
