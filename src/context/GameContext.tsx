import { createContext } from 'react';
import { GameContextValue } from '../types';
import { useFetch } from '../hooks/useFetch.tsx';

const GameContext = createContext<GameContextValue | undefined>(undefined);

const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: currentUserData } = useFetch(
    'http://localhost:3000/currentUser'
  );

  const { data: higscoreData } = useFetch('http://localhost:3000/highscores');

  const value = {
    currentUser: currentUserData || null,
    highscores: higscoreData || {},
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext, GameContextProvider };
