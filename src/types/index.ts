export type InputProps = {
  value: string;
  id: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string | null;
};

export type Challenge = {
  id: number;
  difficulty: 'easy' | 'medium' | 'hard';
  uniqueCards: 12 | 24 | 42;
};

export type HighscoresByChallenge = {
  [challenge: string]: Highscore[];
};

export type Highscore = {
  id: number;
  username: string;
  time: number;
  medalScore: 0 | 1 | 2 | 3;
};

export type GameContextValue = {
  currentUser: {
    id: number;
    username: string;
  } | null;
  highscores: HighscoresByChallenge;
};
