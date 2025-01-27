import { createContext, useReducer, useEffect, useContext } from 'react';
import { gameReducer, initialState } from '../reducer/gameReducer/gameReducer';
import { Challenges, CurrentUser, GameContextStateValue } from '../types';
import { GameDispatch } from '../reducer/gameReducer/gameReducerTypes';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

interface GameContextType {
  state: GameContextStateValue;
  dispatch: GameDispatch;
}

const GameContext = createContext<GameContextType | null>(null);

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const challengesCollection = collection(db, 'challenges');
  const highscoresCollection = collection(db, 'highscores');
  const currentUserCollection = collection(db, 'currentUser');

  useEffect(() => {
    const fetchFireStoreData = async () => {
      try {
        const challengesSnapshot = await getDocs(challengesCollection);
        const highscoresSnapshot = await getDocs(highscoresCollection);
        const currentUserSnapshot = await getDocs(currentUserCollection);
        const challenges: Challenges = challengesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Challenges;

        const currentUser: CurrentUser = currentUserSnapshot.docs.map((doc) =>
          doc.data()
        )[0] as CurrentUser;

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
            currentUser: currentUser,
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
  console.log('LOADING W CONTEXT', state.isLoading);
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
