import { createContext, useReducer, useEffect, useContext } from 'react';
import { useFetch } from '../hooks/useFetch';
import { gameReducer } from '../reducer/gameReducer/gameReducer';
import { FetchRequest, GameContextStateValue } from '../types';
import { GameDispatch } from '../reducer/gameReducer/gameReducerTypes';

interface GameContextType {
  state: GameContextStateValue;
  dispatch: GameDispatch;
}

const GameContext = createContext<GameContextType | null>(null);

const initialState: GameContextStateValue = {
  currentUser: {
    id: 1,
    username: '',
  },
  highscores: {
    easy: [],
    medium: [],
    hard: [],
  },
  challenges: [],
};

const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const requests: FetchRequest<GameContextStateValue>[] = [
    { key: 'challenges', url: 'http://localhost:3000/challenges' },
    { key: 'highscores', url: 'http://localhost:3000/highscores' },
    { key: 'currentUser', url: 'http://localhost:3000/currentUser' },
  ];

  const { data } = useFetch<GameContextStateValue>(requests);

  const { highscores, challenges, currentUser } =
    (data as GameContextStateValue) ?? state;

  useEffect(() => {
    if (currentUser || highscores || challenges) {
      dispatch({
        type: 'SET_ALL_DATA',
        payload: {
          currentUser: currentUser,
          highscores: highscores,
          challenges: challenges,
        },
      });
    }
  }, [currentUser, highscores, challenges]);

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
