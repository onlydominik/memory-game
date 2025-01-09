import { createContext, useReducer, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { gameReducer, GameActionType } from '../reducer/gameReducer';
import { FetchRequest, GameContextStateValue } from '../types';

interface GameContextType {
  state: GameContextStateValue;
  dispatch: React.Dispatch<GameActionType>;
}

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

const GameContext = createContext<GameContextType | undefined>(undefined);

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const requests: FetchRequest<GameContextStateValue>[] = [
    { key: 'challenges', url: 'http://localhost:3000/challenges' },
    { key: 'highscores', url: 'http://localhost:3000/highscores' },
    { key: 'currentUser', url: 'http://localhost:3000/currentUser' },
  ];

  const { data, loading, error } = useFetch<GameContextStateValue>(requests);
  console.log(loading, error);

  const { highscores, challenges, currentUser } =
    (data as GameContextStateValue) ?? initialState;

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

export { GameContext, GameContextProvider };
