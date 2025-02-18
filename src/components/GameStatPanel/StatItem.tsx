import { memo } from 'react';
import { styles } from './styles';
import { StatItemProps } from './types';

const StatItem: React.FC<StatItemProps> = memo(({ label, value, ...props }) => (
  <div
    className={styles.statItem}
    role="status"
    aria-live="polite"
    aria-atomic="true"
    {...props}
  >
    <span id={`${label.toLowerCase()}-label`} className="block">
      {label}
    </span>
    <output
      aria-labelledby={`${label.toLowerCase()}-label`}
      className="block text-2xl font-bold font-mono"
    >
      {value}
    </output>
  </div>
));

StatItem.displayName = 'StatItem';

export { StatItem };
