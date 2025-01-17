import GameOptionPanel from '../../components/GameWinModal/GameStatPanel';
import PlayArea from './PlayArea/PlayArea';
import {
  gameSessionReducer,
  initialState,
} from '../../reducer/gameSessionReducer/gameSessionReducer';
import { useReducer } from 'react';
const GamePanel = () => {
  const [gameSessionState, gameSessionDispatch] = useReducer(
    gameSessionReducer,
    initialState
  );
  const { moves, missed, gameStatus } = gameSessionState;
  return (
    <div className="flex flex-col-reverse gap-8 items-center justify-center mx-3">
      <GameOptionPanel
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

export default GamePanel;
