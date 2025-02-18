import { GameSessionState } from '@reducers/gameSessionReducer/gameSessionReducerTypes';
import { formatTime } from '@features/game/services/timeUtils';
import { styles } from './styles';
import { StatItem } from '@components/GameStatPanel/StatItem';
import { useEffect } from 'react';
import { runConfetti } from '@utils/confetti';
import { Link } from 'react-router-dom';
import animations from './animations.module.css';

interface GameWinModalProps {
  gameSessionState: GameSessionState;
}

const GameWinModal: React.FC<GameWinModalProps> = ({ gameSessionState }) => {
  const { moves, missed, time } = gameSessionState;

  useEffect(() => {
    runConfetti();
  }, []);

  return (
    <div
      className={`${styles.container} ${animations.modal}`}
      aria-modal="true"
      role="dialog"
    >
      <h2 className={styles.title}>LEVEL COMPLETED</h2>
      <p
        className={styles.timer}
        role="timer"
        aria-label={`Completion time: ${formatTime(time)}`}
      >
        {formatTime(time)}{' '}
      </p>
      <div
        className={`${styles.stats} ${animations.statPanel}`}
        aria-label="Game Statistics"
      >
        <StatItem label="MOVES" value={moves} />
        <StatItem label="MISSED" value={missed} />
      </div>
      <Link
        to="/"
        className="text-sm font-sans h-min text-white/40 hover:text-white hover:underline"
      >
        Back to Level Section
      </Link>
    </div>
  );
};

GameWinModal.displayName = 'GameWinModal';

export { GameWinModal };
