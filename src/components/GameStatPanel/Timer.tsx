import { memo } from 'react';
import { TimerProps } from './types';
import { styles } from './styles';
import { formatTime } from '../../features/game/services/timeUtils';

export const Timer = memo<TimerProps>(({ gameStatus, timer, ...props }) => (
  <div className={styles.timerContainer(gameStatus === 'pending')} {...props}>
    {gameStatus === 'pending' ? 'Click card to start!' : formatTime(timer)}
  </div>
));

Timer.displayName = 'Timer';
