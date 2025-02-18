import { GameStatPanel } from '@components/GameStatPanel/GameStatPanel';
import { PlayArea } from '../components/PlayArea/PlayArea';
import {
  gameSessionReducer,
  initialState as initialStateSessionGame,
} from '@reducers/gameSessionReducer/gameSessionReducer';
import { useEffect, useReducer } from 'react';

import { useGameContext } from '@hooks/useGameContext';
import nProgress from 'nprogress';
import { useParams } from 'react-router-dom';
import { Challenge } from '@/types';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { LevelNotFound } from '../components/LevelNotFound';

const GamePanel = () => {
  const { difficulty } = useParams<{ difficulty: Challenge['difficulty'] }>();
  const [gameSessionState, gameSessionDispatch] = useReducer(
    gameSessionReducer,
    initialStateSessionGame
  );
  const { state: gameCoreState } = useGameContext();

  useDocumentTitle(difficulty ?? 'PLAY', { prefix: 'MIND MELD -' });

  useEffect(() => {
    if (gameCoreState.isLoading) {
      nProgress.start();
    } else nProgress.done();
  }, [gameCoreState.isLoading]);

  const challenges = gameCoreState.challenges ?? [];
  const activeChallenge = challenges.find(
    (challenge) => challenge.difficulty === difficulty
  );

  const { moves, missed, gameStatus } = gameSessionState;
  if (gameCoreState.isLoading && !activeChallenge) return null;
  if (activeChallenge === undefined) return <LevelNotFound />;

  return (
    <div className="flex flex-col-reverse gap-8 items-center justify-center mx-3">
      <GameStatPanel
        moves={moves}
        missed={missed}
        gameStatus={gameStatus}
        gameSessionDispatch={gameSessionDispatch}
      />
      <PlayArea
        gameSessionState={gameSessionState}
        gameSessionDispatch={gameSessionDispatch}
        activeChallenge={activeChallenge}
      />
    </div>
  );
};

GamePanel.displayName = 'GamePanel';

export default GamePanel;
