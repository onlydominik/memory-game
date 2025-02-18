import { useLoaderData } from 'react-router-dom';
import {
  difficultyClassMap,
  medalScoreTimeColors,
} from '@utils/constants/cardDifficultyStyles';
import { MedalIcons } from '@components/MedalIcons';
import { formatTime } from '../../game/services/timeUtils';
import { useDocumentTitle } from '@hooks/useDocumentTitle';
import type { Highscore } from '@typings/index';

const HighscoresScreen = () => {
  const data: Record<string, Highscore[]> = useLoaderData();

  useDocumentTitle('Highscores', { suffix: '- MIND MELD' });
  return (
    <main className="max-w-screen-sm mx-auto">
      {Object.entries(data).map(
        ([difficulty, scores]: [string, Highscore[]]) => {
          const difficultyKey = difficulty as keyof typeof difficultyClassMap;
          const difficultyClassBg = difficultyClassMap[difficultyKey]?.bg || '';
          return (
            <section key={difficulty} className="mb-8 mx-2">
              <div
                className={`w-48 py-3 mb-2 text-center rounded-se-[4rem] ${difficultyClassBg}`}
              >
                <h2
                  className={`ml-[-1rem] text-2xl font-bold text-white cursor-default`}
                >
                  {difficulty.toUpperCase()}
                </h2>
              </div>
              {scores.length === 0 && (
                <div className="text-xl py-3 px-4 bg-white text-dark">
                  No one has completed this level yet
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {scores
                  .sort((a, b) => {
                    if (a.medalScore === b.medalScore) {
                      return a.time - b.time;
                    }
                    return b.medalScore - a.medalScore;
                  })
                  .map((score, index) => (
                    <div
                      key={index}
                      className="p-4 rounded bg-white shadow-smoothShadow hover:outline-dotted hover:outline-[0.3rem] hover:outline-logoTheme cursor-default"
                    >
                      <div className="grid sm:flex items-center gap-4 w-full">
                        <div className="flex items-center justify-between gap-8 w-full text-xl">
                          <p>{score.username}</p>
                          <span
                            className={`text-2xl ${
                              medalScoreTimeColors[score.medalScore]
                            }`}
                          >
                            {formatTime(score.time)}
                          </span>
                        </div>

                        <MedalIcons
                          medalScore={score.medalScore}
                          className="justify-self-center sm:ml-auto min-w-max"
                        />
                        <div className="flex gap-8 justify-self-center text-nowrap">
                          <span>Moves: {score.moves}</span>
                          <span>Missed: {score.missed}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          );
        }
      )}
    </main>
  );
};

HighscoresScreen.displayName = 'HighscoresScreen';

export default HighscoresScreen;
