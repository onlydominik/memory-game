import { GameSessionState } from '../../reducers/gameSessionReducer/gameSessionReducerTypes';
import { formatTime } from '../../features/game/services/timeUtils';
import { styles } from './styles';
import { StatItem } from '../GameStatPanel/StatItem';
const GameWinModal = ({
  gameSessionState,
}: {
  gameSessionState: GameSessionState;
}) => {
  const { moves, missed, time } = gameSessionState;
  return (
    <div
      className={styles.modal}
      aria-modal="true"
      aria-labelledby="modal-title"
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
      <div className={styles.statsContainer} aria-label="Game Statistics">
        <StatItem label="MOVES" value={moves} />
        <StatItem label="MISSED" value={missed} />
      </div>
    </div>
  );
};

GameWinModal.displayName = 'GameWinModal';

export default GameWinModal;
