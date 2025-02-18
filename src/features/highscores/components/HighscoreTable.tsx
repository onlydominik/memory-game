import { MedalIcons } from '@components/MedalIcons';
import { Challenge, Highscore } from '@typings/index';
import { difficultyClassMap } from '@utils/constants/cardDifficultyStyles';
import { formatTime } from '../../game/services/timeUtils';

interface HighscoreTableProps {
  difficulty: Challenge['difficulty'];
  scores: Highscore[];
  className?: string;
}

const HighscoreTable = ({
  difficulty,
  scores,
  className,
}: HighscoreTableProps) => {
  const difficultyKey = difficulty as keyof typeof difficultyClassMap;
  const difficultyClassBg = difficultyClassMap[difficultyKey]?.bg || '';

  return (
    <section
      className={`mb-8 mx-2 ${className}`}
      aria-labelledby={`${difficulty}-title`}
    >
      <div
        className={`w-48 py-3 mb-2 text-center rounded-se-[4rem] ${difficultyClassBg}`}
      >
        <h2
          id={`${difficulty}-title`}
          className="ml-[-1rem] text-2xl font-bold text-white cursor-default"
        >
          {difficulty.toUpperCase()}
        </h2>
      </div>

      {scores.length === 0 ? (
        <p className="text-xl py-3 px-4 bg-white text-dark" role="status">
          No scores recorded for this level yet
        </p>
      ) : (
        <div
          className="grid grid-cols-1 gap-4"
          role="table"
          aria-label={`Highscores for ${difficulty} difficulty`}
        >
          {scores.map((score, index) => (
            <div
              key={`${score.username}-${index}`}
              className="bg-white p-4 rounded-lg shadow-sm"
              role="row"
            >
              <div className="flex justify-between items-center">
                <div role="cell">
                  <span className="font-bold">{index + 1}. </span>
                  <span>{score.username}</span>
                </div>
                <div className="flex items-center gap-4" role="cell">
                  <span className="text-gray-600">
                    {formatTime(score.time)}
                  </span>
                  <MedalIcons medalScore={score.medalScore} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

HighscoreTable.displayName = 'HighscoreTable';

export { HighscoreTable };
