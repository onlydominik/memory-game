import { Highscore } from '@typings/index';

const sortHighscores = (a: Highscore, b: Highscore): number => {
  // Primary sort by medal score (descending)
  if (a.medalScore !== b.medalScore) {
    return b.medalScore - a.medalScore;
  }
  // Secondary sort by time (ascending)
  if (a.time !== b.time) {
    return a.time - b.time;
  }
  // Tertiary sort by moves (ascending)
  return a.moves - b.moves;
};
export { sortHighscores };
