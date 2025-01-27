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
  isMatched: boolean;
}

const PlayAreaCard = memo<PlayAreaCardProps>(
  ({ id, path, color, handleClick, isFlipped, isMatched }) => {
    return (
      <div
        onClick={handleClick}
        className={`flex items-center justify-center w-full aspect-square border-2 md:border-3 xl:border-4 rounded-lg ${
          styles.PlayAreaCard
        } ${isMatched ? 'opacity-40 transition-opacity' : ''} ${
          isFlipped || isMatched
            ? `bg-white cursor-default ${colorVariants[color]}`
            : colorVariants['disabled']
        }`}
        role="button"
      >
        <img
          width="40"
          height="40"
          className={`w-3/4 md:w-1/2 ${
            isFlipped || isMatched ? '' : 'md:w-3/4'
          }`}
          src={isFlipped || isMatched ? path : questionMark}
          alt={
            isFlipped || isMatched
              ? `Card symbol with id: ${id}`
              : 'Hidden card'
          }
          loading="lazy"
        />
      </div>
    );
  },
  (prev, next) =>
    prev.id === next.id &&
    prev.isFlipped === next.isFlipped &&
    prev.color === next.color
);

PlayAreaCard.displayName = 'PlayAreaCard';

export default PlayAreaCard;
