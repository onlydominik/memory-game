import { memo } from 'react';
import { colorVariants } from './PlayAreaCard.colors';
import questionMark from '/icons/question-mark.png';
import styles from './PlayArea.module.css';

interface PlayAreaCardProps {
  id: number;
  path: string;
  color: string;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  isFlipped: boolean;
}

const PlayAreaCard = memo<PlayAreaCardProps>(
  ({ id, path, color, handleClick, isFlipped }) => {
    return (
      <div
        onClick={handleClick}
        className={`flex items-center justify-center w-full aspect-square border-2 md:border-3 xl:border-4 rounded-lg ${
          styles.PlayAreaCard
        } ${
          isFlipped
            ? `bg-white ${colorVariants[color]}`
            : colorVariants['disabled']
        }`}
        role="button"
      >
        <img
          width="40"
          height="40"
          className={`w-3/4 md:w-1/2 ${isFlipped ? '' : 'md:w-3/4'}`}
          src={isFlipped ? path : questionMark}
          alt={isFlipped ? `Card symbol with id: ${id}` : 'Hidden card'}
          loading="lazy"
        />
      </div>
    );
  },
  (prev, next) => prev.isFlipped === next.isFlipped
);

PlayAreaCard.displayName = 'PlayAreaCard';

export default PlayAreaCard;
