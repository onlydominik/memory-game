import medal from '/icons/medal-active.svg';
import medalDisabled from '/icons/medal-disabled.svg';

const MedalIcons = ({
  medalScore,
  className,
}: {
  medalScore: number;
  className?: string;
}) => {
  const medalClassname = `w-10 sm:w-12 md:w-10`;
  const medalIcons = [1, 2, 3].map((score) => {
    return (
      <img
        key={score}
        src={medalScore >= score ? medal : medalDisabled}
        alt={`Medal icon ${score}`}
        width="74"
        height="74"
        className={medalClassname}
      />
    );
  });

  return <div className={`flex ${className}`}>{medalIcons}</div>;
};

export default MedalIcons;
