import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { Challenge, HighscoresByChallenge } from '../../types';
import MedalIcons from './MedalIcons';

enum Difficulty {
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard',
}

const difficultyClassMap: Record<Difficulty, { text: string; bg: string }> = {
  [Difficulty.Easy]: {
    text: 'text-challenge-levelEasy',
    bg: 'bg-challenge-levelEasy',
  },
  [Difficulty.Medium]: {
    text: 'text-challenge-levelMedium',
    bg: 'bg-challenge-levelMedium',
  },
  [Difficulty.Hard]: {
    text: 'text-challenge-levelHard',
    bg: 'bg-challenge-levelHard',
  },
};

const medalScoreTimeColors: { [key: number]: string } = {
  0: 'text-challenge-text',
  1: 'text-accentRed',
  2: 'text-accentOrange',
  3: 'text-accentGreen',
};

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

  const capitalizeFirst = (str: string) => {
    return str ? str[0].toUpperCase() + str.slice(1) : '';
  };

  const difficultyCapitalized = useMemo(() => {
    return capitalizeFirst(difficulty) as keyof typeof difficultyClassMap;
  }, [difficulty]);

  const difficultyClassText =
    difficultyClassMap[difficultyCapitalized].text || '';

  const difficultyClassBg = difficultyClassMap[difficultyCapitalized].bg || '';

  const timeColorClass = medalScoreTimeColors[highscore.medalScore];

  return (
    <article className="bg-challenge-bg rounded-lg overflow-hidden">
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
          <span className={`ml-2 ${timeColorClass}`}>
            {highscore.time != null ? `${highscore.time} s` : '---'}
          </span>
        </div>
      </div>
      <Link
        to="/"
        aria-label={`Start challenge for ${difficulty} level`}
        className={`block w-full py-2 text-center text-2xl text-challenge-bg/50 ${difficultyClassBg}`}
      >
        START
      </Link>
    </article>
  );
};

export default LevelPickerPanelCard;
