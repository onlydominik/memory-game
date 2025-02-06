import medal from '/icons/medal-active.svg';
import medalDisabled from '/icons/medal-disabled.svg';

const MedalIcons = ({
  medalScore,
  className = '',
}: {
  medalScore: number;
  className?: string;
}) => {
  const medalClassname = 'w-10 sm:w-12 md:w-10';

  return (
    <div
      className={`flex ${className}`}
      role="group"
      aria-label={`Achievement level: ${medalScore} out of 3 medals earned`}
    >
      {[1, 2, 3].map((score) => (
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

export default MedalIcons;
