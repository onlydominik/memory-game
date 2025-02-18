import React, {
  createContext,
  useReducer,
  useEffect,
  memo,
  useMemo,
} from 'react';
import { gameReducer, initialState } from '@reducers/gameReducer/gameReducer';
import { useAuth } from '@hooks/useAuth';
import { fetchChallenges, fetchHighscores } from '@services/firebase/firebase';
import type {
  CurrentUserData,
  GameContextType,
  GameProviderProps,
} from './types';

const GameContext = createContext<GameContextType | null>(null);

const GameProvider: React.FC<GameProviderProps> = memo(({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const { currentUser } = useAuth();

  const currentUserData = useMemo<CurrentUserData>(
    () => ({
      username: currentUser?.displayName || '',
      isAnonymous: currentUser?.isAnonymous || false,
    }),
    [currentUser?.displayName, currentUser?.isAnonymous]
  );

  useEffect(() => {
    const fetchFireStoreData = async () => {
      try {
        const [challenges, highscores] = await Promise.all([
          fetchChallenges(),
          fetchHighscores(),
        ]);

        dispatch({
          type: 'SET_ALL_DATA',
          payload: {
            currentUser: currentUserData,
            highscores,
            challenges,
            isLoading: false,
          },
        });
      } catch (error) {
        console.error('Failed to fetch Firestore data:', error);
      }
    };

    fetchFireStoreData();
  }, [currentUserData]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
});

GameProvider.displayName = 'GameProvider';

export { GameContext, GameProvider };
