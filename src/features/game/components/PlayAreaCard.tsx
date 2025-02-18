import { memo } from 'react';
import { colorVariants } from '@utils/constants/cardImageColors';
import questionMark from '/icons/question-mark.png';

interface PlayAreaCardProps {
  id: number;
  path: string;
  color: keyof typeof colorVariants;
  handleClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  isFlipped: boolean;
  isMatched: boolean;
  className?: string;
  isWrong?: boolean;
}

const areEqual = (prev: PlayAreaCardProps, next: PlayAreaCardProps) =>
  prev.id === next.id &&
  prev.isFlipped === next.isFlipped &&
  prev.isMatched === next.isMatched &&
  prev.color === next.color &&
  prev.className === next.className &&
  prev.isWrong === next.isWrong;

const PlayAreaCard: React.FC<PlayAreaCardProps> = memo(
  ({ id, path, color, handleClick, isFlipped, isMatched, isWrong }) => {
    const isVisible = isFlipped || isMatched;
    const isClickable = !isMatched && !isFlipped;

    return (
      <div
        onClick={isClickable ? handleClick : undefined}
        className={`flex items-center justify-center w-full aspect-square border-2 md:border-3 xl:border-4 rounded-lg
          ${isMatched ? 'opacity-40 transition-opacity' : ''}
          ${
            isVisible
              ? `bg-white ${colorVariants[color]}`
              : `${colorVariants['disabled']}`
          }
          ${isClickable ? 'cursor-pointer' : 'cursor-default'}
          min-h-[50px] min-w-[50px] bg-gray-200
          ${isWrong ? 'animate-shake' : ''}
        `}
        role="button"
        aria-hidden={!isClickable}
      >
        <img
          width="40"
          height="40"
          className={`w-3/4 ${isVisible ? 'md:w-1/2' : 'md:w-3/4'}`}
          src={isVisible ? path : questionMark}
          alt={isVisible ? `Card symbol with id: ${id}` : 'Hidden card'}
          loading="lazy"
        />
      </div>
    );
  },
  areEqual
);

PlayAreaCard.displayName = 'PlayAreaCard';

export default PlayAreaCard;
