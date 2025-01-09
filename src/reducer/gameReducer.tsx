import { GameContextStateValue } from '../types';

const actionTypes = {
  SET_USER: 'SET_USER',
  SET_HIGHSCORES: 'SET_HIGHSCORES',
  SET_CHALLENGES: 'SET_CHALLENGES',
  SET_ALL_DATA: 'SET_ALL_DATA',
};

type ReducerTypes = keyof typeof actionTypes;

type GameActionType = {
  payload: GameContextStateValue;
  type: ReducerTypes;
};

const gameReducer = (
  state: GameContextStateValue,
  action: GameActionType
): GameContextStateValue => {
  switch (action.type) {
    case actionTypes.SET_ALL_DATA: {
      return {
        ...state,
        currentUser: action.payload.currentUser || state.currentUser,
        highscores: action.payload.highscores || state.highscores,
        challenges: action.payload.challenges || state.challenges,
      };
    }
    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser || state.currentUser,
      };
    case actionTypes.SET_HIGHSCORES:
      return {
        ...state,
        highscores: action.payload.highscores || state.highscores,
      };
    case actionTypes.SET_CHALLENGES:
      return {
        ...state,
        challenges: action.payload.challenges || state.challenges,
      };
    default:
      return state;
  }
};

export { gameReducer };
export type { GameActionType };
