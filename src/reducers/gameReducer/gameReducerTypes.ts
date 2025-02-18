import { Challenge, GameContextStateValue, Highscore } from '@typings/index';

export type GameCoreDispatch = React.Dispatch<GameAction>;

export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_HIGHSCORES_BY_DIFFICULTY: 'SET_HIGHSCORES_BY_DIFFICULTY',
  SET_CHALLENGES: 'SET_CHALLENGES',
  SET_ALL_DATA: 'SET_ALL_DATA',
  SET_IS_LOADING: 'SET_IS_LOADING',
} as const;

interface SetUserAction {
  type: typeof actionTypes.SET_USER;
  payload: Pick<GameContextStateValue, 'currentUser'>;
}

interface SetHighscoresAction {
  type: typeof actionTypes.SET_HIGHSCORES_BY_DIFFICULTY;
  payload: {
    difficulty: Challenge['difficulty'];
    newHighscores: Highscore[];
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

interface SetIsLoadingAction {
  type: typeof actionTypes.SET_IS_LOADING;
  payload: { isLoading: boolean };
}

export type GameAction =
  | SetUserAction
  | SetHighscoresAction
  | SetChallengesAction
  | SetAllDataAction
  | SetIsLoadingAction;
