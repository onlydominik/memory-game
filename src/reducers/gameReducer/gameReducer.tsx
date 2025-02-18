import { GameContextStateValue, HighscoresByChallenge } from '@typings/index';
import { GameAction, actionTypes } from './gameReducerTypes';

const initialState: GameContextStateValue = {
  currentUser: {
    username: '',
    isAnonymous: false,
  },
  highscores: {
    easy: [],
    medium: [],
    hard: [],
  },
  challenges: [],
  isLoading: true,
};

const gameReducer = (
  state: GameContextStateValue,
  action: GameAction
): GameContextStateValue => {
  switch (action.type) {
    case actionTypes.SET_ALL_DATA:
      return {
        ...state,
        currentUser: action.payload.currentUser ?? state.currentUser,
        highscores: action.payload.highscores ?? state.highscores,
        challenges: action.payload.challenges ?? state.challenges,
        isLoading: action.payload.isLoading,
      };

    case actionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser ?? state.currentUser,
      };

    case actionTypes.SET_HIGHSCORES_BY_DIFFICULTY: {
      const { difficulty, newHighscores } = action.payload;

      const updatedHighscores: HighscoresByChallenge = {
        ...state.highscores,
        [difficulty]: newHighscores,
      };

      return {
        ...state,
        highscores: updatedHighscores,
      };
    }

    default:
      console.error(
        'Not Valid Action Type: gameReducer | Returning previous state ...'
      );
      return state;
  }
};

export { gameReducer, actionTypes, initialState };
