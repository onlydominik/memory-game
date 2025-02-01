import GameStatPanel from '../../components/GameStatPanel/GameStatPanel';
import PlayArea from './PlayArea/PlayArea';
import {
  gameSessionReducer,
  initialState as initialStateSessionGame,
} from '../../reducer/gameSessionReducer/gameSessionReducer';
import { useReducer } from 'react';

const GamePanel = () => {
  const [gameSessionState, gameSessionDispatch] = useReducer(
    gameSessionReducer,
    initialStateSessionGame
  );

  const { moves, missed, gameStatus } = gameSessionState;
  return (
    <div className="flex flex-col-reverse gap-8 items-center justify-center mx-3">
      <GameStatPanel
        gameStatus={gameStatus}
        moves={moves}
        missed={missed}
        gameSessionDispatch={gameSessionDispatch}
      />
      <PlayArea
        gameSessionState={gameSessionState}
        gameSessionDispatch={gameSessionDispatch}
      />
    </div>
  );
};

GamePanel.displayName = 'GamePanel';

export default GamePanel;
