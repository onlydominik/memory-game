import { useContext } from 'react';
import { GameContext } from '@context/GameContext/GameContext';

const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};

export { useGameContext };
