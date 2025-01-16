import { GameSessionState } from '../../reducer/gameSessionReducer/gameSessionReducerTypes';
import { formatTime } from '../../pages/GamePanel/GameLogicUtils';

const GameWinModal = ({
  gameSessionState,
}: {
  gameSessionState: GameSessionState;
}) => {
  const { moves, missed, time } = gameSessionState;
  const singleStatAreaClassname = 'grid justify-items-center';
  return (
    <div className="absolute grid gap-8 px-4 justify-items-center content-center h-max sm:w-3/4 py-24 text-center border-[1rem] border-accentGreen bg-white shadow-modalShadow rounded-3xl">
      <p className="text-5xl md:text-6xl text-accentGreen">LEVEL COMPLETED</p>
      <p className="text-4xl md:text-5xl">{formatTime(time)} </p>
      <div className="flex justify-center items-center max-w-max px-10 gap-10 py-4 text-xl md:text-2xl text-gameStatPanel-textSecondary bg-gameStatPanel-bgAccent rounded-xl shadow-smoothShadow">
        <div className={singleStatAreaClassname}>
          <p>MOVES</p>
          <div>{moves}</div>
        </div>
        <div className={singleStatAreaClassname}>
          <p>MISSED</p>
          <div>{missed}</div>
        </div>
      </div>
    </div>
  );
};

GameWinModal.displayName = 'GameWinModal';

export default GameWinModal;
