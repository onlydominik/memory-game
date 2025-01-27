import { Link } from 'react-router-dom';
import { Challenge, HighscoresByChallenge } from '../../types';
import MedalIcons from './MedalIcons';
import {
  difficultyClassMap,
  medalScoreTimeColors,
} from '../../utils/gameStyleUtils';
const LevelPickerPanelCard = ({
  challenge,
  highscores,
}: {
  challenge: Challenge;
  highscores: HighscoresByChallenge;
}) => {
  const { difficulty, uniqueCards } = challenge;
  const records = highscores[difficulty] || [];
  const highscore = records[0] || {
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
        <div className="flex gap-2 w-10 sm:w-64 md:w-10 justify-self-center justify-center">
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
      </Link>
    </article>
  );
};

export default LevelPickerPanelCard;
