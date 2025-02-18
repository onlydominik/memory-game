import { useEffect, memo, useState, useRef } from 'react';
import { styles } from './styles';
import { Timer } from './Timer';
import { StatItem } from './StatItem';
import { GameStatPanelProps } from './types';

const areEqual = (prev: GameStatPanelProps, next: GameStatPanelProps) =>
  prev.moves === next.moves &&
  prev.missed === next.missed &&
  prev.gameStatus === next.gameStatus;

const GameStatPanel: React.FC<GameStatPanelProps> = memo(
  ({ moves, missed, gameStatus, gameSessionDispatch }) => {
    const [timer, setTimer] = useState<number>(0);
    const interval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      if (gameStatus === 'inProgress')
        interval.current = setInterval(() => {
          setTimer((prev) => prev + 1);
        }, 1000);

      return () => {
        if (interval.current) {
          clearInterval(interval.current);
        }
      };
    }, [gameStatus]);

    useEffect(() => {
      if (gameStatus === 'win') {
        gameSessionDispatch({
          type: 'SET_TIME',
          payload: timer,
        });
        if (interval.current) {
          clearInterval(interval.current);
        }
      }
    }, [gameStatus, timer, gameSessionDispatch]);

    if (gameStatus === 'win') return null;

    return (
      <aside
        className={styles.container}
        role="complementary"
        aria-label="Game Statistics"
      >
        <Timer
          gameStatus={gameStatus}
          timer={timer}
          aria-live="polite"
          aria-atomic="true"
        />
        <div className={styles.statsContainer}>
          <StatItem
            label="MOVES"
            value={moves}
            aria-label={`Moves made: ${moves}`}
          />
          <StatItem
            label="MISSED"
            value={missed}
            aria-label={`Missed attempts: ${missed}`}
          />
        </div>
      </aside>
    );
  },
  areEqual
);

GameStatPanel.displayName = 'GameStatPanel';

export { GameStatPanel };
