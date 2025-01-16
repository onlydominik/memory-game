import { useEffect, memo, useState, useRef } from 'react';
import { GameSessionDispatch } from '../../reducer/gameSessionReducer/gameSessionReducerTypes';
import { GameSessionState } from '../../reducer/gameSessionReducer/gameSessionReducerTypes';
import { formatTime } from '../../pages/GamePanel/GameLogicUtils';
const GameStatPanel = memo(
  ({
    gameStatus,
    gameSessionDispatch,
    moves,
    missed,
  }: Partial<GameSessionState> & {
    gameSessionDispatch: GameSessionDispatch;
  }) => {
    const [timer, setTimer] = useState(0);
    const interval = useRef(0);

    useEffect(() => {
      if (gameStatus === 'inProgress')
        interval.current = setInterval(() => {
          setTimer((prev) => prev + 1);
        }, 1000);

      return () => clearInterval(interval.current);
    }, [gameStatus]);

    useEffect(() => {
      if (gameStatus === 'win') {
        gameSessionDispatch({
          type: 'SET_TIME',
          payload: timer,
        });
        clearInterval(interval.current);
      }
    }, [gameStatus, timer]);

    const singleStatAreaClassname = 'grid justify-items-center';
    if (gameStatus === 'win') return null;
    return (
      <aside className="xl:absolute xl:left-[-7rem] grid gap-3 justify-center w-full xs:max-w-[30rem] xl:w-max px-4 py-4 bg-white rounded-xl shadow-smoothShadow">
        <div
          className={`text-center content-center xl:py-14 h-[3rem] xl:h-[10rem] text-gameStatPanel-textPrimary ${
            gameStatus === 'pending' ? 'text-2xl' : 'text-5xl'
          }`}
        >
          {gameStatus === 'pending'
            ? 'Click card to start!'
            : formatTime(timer)}
        </div>
        <div className="flex justify-center gap-10 py-4 px-6 sm:px-20 xl:px-6 xl:mb-12 text-xl text-gameStatPanel-textSecondary bg-gameStatPanel-bgAccent rounded-xl shadow-smoothShadow">
          <div className={singleStatAreaClassname}>
            <p>MOVES</p>
            <div>{moves}</div>
          </div>
          <div className={singleStatAreaClassname}>
            <p>MISSED</p>
            <div>{missed}</div>
          </div>
        </div>
      </aside>
    );
  },
  (prev, next) =>
    prev.gameStatus === next.gameStatus &&
    prev.moves === next.moves &&
    prev.missed === next.missed
);

GameStatPanel.displayName = 'GameStatPanel';

export default GameStatPanel;
