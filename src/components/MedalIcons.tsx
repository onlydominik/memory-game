import React from 'react';
import medal from '/icons/medal-active.svg';
import medalDisabled from '/icons/medal-disabled.svg';
import { MEDAL_VALUES } from '@utils/constants';

interface MedalIconsProps {
  medalScore: number;
  className?: string;
}

const MedalIcons: React.FC<MedalIconsProps> = ({
  medalScore,
  className = '',
}) => {
  const medalClassname = 'w-10 sm:w-12 md:w-10';

  return (
    <div
      className={`flex ${className}`}
      role="group"
      aria-label={`Achievement level: ${medalScore} out of 3 medals earned`}
    >
      {MEDAL_VALUES.map((score) => (
        <img
          key={score}
          src={medalScore >= score ? medal : medalDisabled}
          alt={
            medalScore >= score
              ? `Medal ${score} earned`
              : `Medal ${score} not earned`
          }
          width="74"
          height="74"
          className={medalClassname}
          loading="lazy"
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

MedalIcons.displayName = 'MedalIcons';

export { MedalIcons };
