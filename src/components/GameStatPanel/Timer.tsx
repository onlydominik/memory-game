import { memo } from 'react';
import { TimerProps } from './types';
import { styles } from './styles';
import { formatTime } from '@features/game/services/timeUtils';

const Timer: React.FC<TimerProps> = memo(({ gameStatus, timer, ...props }) => (
  <div className={styles.timerContainer(gameStatus === 'pending')} {...props}>
    {gameStatus === 'pending' ? 'Click card to start!' : formatTime(timer)}
  </div>
));

Timer.displayName = 'Timer';

export { Timer };
