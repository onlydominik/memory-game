import { Link } from 'react-router-dom';
import type {
  Challenge,
  Highscore,
  HighscoresByChallenge,
} from '@typings/index';
import { MedalIcons } from '@components/MedalIcons';
import {
  difficultyClassMap,
  medalScoreTimeColors,
} from '@utils/constants/cardDifficultyStyles';
import { useAuth } from '@hooks/useAuth';

interface LevelPickerPanelCardProps {
  challenge: Challenge;
  highscores: HighscoresByChallenge;
}

const LevelPickerPanelCard: React.FC<LevelPickerPanelCardProps> = ({
  challenge,
  highscores,
}) => {
  const { difficulty, uniqueCards } = challenge;
  const { currentUser } = useAuth();

  const getAnonymousHighscores = (difficulty: Challenge['difficulty']) => {
    const stored = localStorage.getItem('anonymousHighscores');
    if (!stored) return [];
    const scores = JSON.parse(stored) as HighscoresByChallenge;

    return scores[difficulty] || [];
  };

  const records = currentUser?.isAnonymous
    ? getAnonymousHighscores(difficulty)
    : highscores[difficulty] || [];

  const currentUserHighscoreIndex = records.findIndex(
    (highscore: Highscore) => {
      return currentUser?.isAnonymous
        ? highscore.username === 'Guest'
        : highscore.username === currentUser?.displayName;
    }
  );
  const highscore = records[currentUserHighscoreIndex] || {
    time: 0,
    medalScore: 0,
  };
  const difficultyClassText = difficultyClassMap[difficulty].text || '';

  const difficultyClassBg = difficultyClassMap[difficulty].bg || '';

  const timeColorClass = medalScoreTimeColors[highscore.medalScore];

  return (
    <article className="bg-challenge-bg rounded-lg overflow-hidden cursor-default">
      <div className="grid gap-10 md:gap-20 p-4">
        <div className="text-lg">
          <span className={`text-6xl mr-2 ${difficultyClassText}`}>
            {uniqueCards}
          </span>
          CARDS
        </div>
        <div className="flex w-fit gap-2 justify-self-center">
          <MedalIcons medalScore={highscore.medalScore} />
        </div>
        <div className="text-lg">
          YOUR RECORD
          <span
            className={`ml-2 ${
              highscore.time ? timeColorClass : 'text-challenge-text'
            }`}
          >
            {highscore.time ? `${highscore.time} s` : '---'}
          </span>
        </div>
      </div>
      <Link
        to={`/level/${difficulty}`}
        aria-label={`Start challenge for ${difficulty} level`}
        className={`block w-full py-2 text-center text-2xl text-challenge-bg/50 hover:text-white/90 ${difficultyClassBg}`}
      >
        START
        <span className="sr-only">{` challenge for ${difficulty} level`}</span>
      </Link>
    </article>
  );
};

export default LevelPickerPanelCard;
