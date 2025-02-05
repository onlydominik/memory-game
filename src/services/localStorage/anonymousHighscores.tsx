import {
  AnonymousHighscore,
  HighscoresByChallengeAnonymous,
} from '../../types';

export const ANONYMOUS_HIGHSCORES_KEY = 'anonymousHighscores';

export const getAnonymousHighscores = (): HighscoresByChallengeAnonymous => {
  const stored = localStorage.getItem(ANONYMOUS_HIGHSCORES_KEY);
  return stored ? JSON.parse(stored) : { easy: [], medium: [], hard: [] };
};

export const saveAnonymousHighscore = (highscore: AnonymousHighscore) => {
  const highscores = getAnonymousHighscores();
  const { difficulty } = highscore;

  highscores[difficulty] = [...highscores[difficulty], highscore]
    .sort((a, b) => {
      if (a.moves === b.moves) {
        return a.time - b.time;
      }
      return a.moves - b.moves;
    })
    .slice(0, 10);

  localStorage.setItem(ANONYMOUS_HIGHSCORES_KEY, JSON.stringify(highscores));
};
