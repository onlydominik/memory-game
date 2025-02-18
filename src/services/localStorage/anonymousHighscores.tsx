import { ANONYMOUS_HIGHSCORES_KEY } from '@utils/constants';
import { sortHighscores } from '@utils/sortHighscores';
import type { Highscore, HighscoresByChallenge } from '@typings/index';

const getAnonymousHighscores = (): HighscoresByChallenge => {
  const stored = localStorage.getItem(ANONYMOUS_HIGHSCORES_KEY);
  return stored ? JSON.parse(stored) : { easy: [], medium: [], hard: [] };
};

const saveAnonymousHighscore = (highscore: Highscore) => {
  const highscores = getAnonymousHighscores();
  const { difficulty } = highscore;

  highscores[difficulty] = [...highscores[difficulty], highscore]
    .sort(sortHighscores)
    .slice(0, 10);

  localStorage.setItem(ANONYMOUS_HIGHSCORES_KEY, JSON.stringify(highscores));
};

export { getAnonymousHighscores, saveAnonymousHighscore };
