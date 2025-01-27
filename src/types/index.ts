export interface InputProps {
  value: string;
  id: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  error?: string | null;
}

export interface Challenge {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  uniqueCards: 12 | 24 | 42;
  medalTimeLimits: {
    bronze: 45 | 120 | 300;
    silver: 30 | 75 | 180;
    gold: 20 | 50 | 120;
  };
}
export type Challenges = Challenge[];

export interface Image {
  id: number;
  path: string;
  color: string;
}

export type Images = Image[];

export type Highscore = {
  id: number;
  username: string;
  difficulty: 'easy' | 'medium' | 'hard';
  time: number;
  moves: number;
  missed: number;
  medalScore: 0 | 1 | 2 | 3;
};
export type HighscoresByChallenge = {
  easy: Highscore[];
  medium: Highscore[];
  hard: Highscore[];
};

export interface CurrentUser {
  username: string;
}

export interface GameContextStateValue {
  challenges: Challenges;
  highscores: HighscoresByChallenge;
  currentUser: CurrentUser;
  isLoading: boolean;
}

export type FetchRequest<T> = { key: keyof T; url: string };
export type FetchResult<T> = {
  data: T | null;
  error: Record<keyof T, unknown> | null;
  loading: boolean;
};

//GAME PANEL TYPES
export type TimeoutId = ReturnType<typeof setTimeout>;
export type UseRefTimeout = React.MutableRefObject<TimeoutId | undefined>;
