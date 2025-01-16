import { GameContextStateValue, HighscoresByChallenge } from '../../types';

export type GameDispatch = React.Dispatch<GameAction>;

export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_HIGHSCORES: 'SET_HIGHSCORES',
  SET_CHALLENGES: 'SET_CHALLENGES',
  SET_ALL_DATA: 'SET_ALL_DATA',
} as const;

interface SetUserAction {
  type: typeof actionTypes.SET_USER;
  payload: Pick<GameContextStateValue, 'currentUser'>;
}

interface SetHighscoresAction {
  type: typeof actionTypes.SET_HIGHSCORES;
  payload: {
    difficulty: keyof HighscoresByChallenge;
    time: number;
    moves: number;
    missed: number;
    username: string;
    medalScore: number;
  };
}

interface SetChallengesAction {
  type: typeof actionTypes.SET_CHALLENGES;
  payload: Pick<GameContextStateValue, 'challenges'>;
}

interface SetAllDataAction {
  type: typeof actionTypes.SET_ALL_DATA;
  payload: GameContextStateValue;
}

export type GameAction =
  | SetUserAction
  | SetHighscoresAction
  | SetChallengesAction
  | SetAllDataAction;
