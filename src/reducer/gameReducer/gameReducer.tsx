import { GameContextStateValue } from '../../types';
import { GameAction, actionTypes } from './gameReducerTypes';

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
      };

    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser ?? state.currentUser,
      };

    case actionTypes.SET_HIGHSCORES:
      const { difficulty, time, moves, missed, username, medalScore } =
        action.payload;
      return {
        ...state,
        highscores: {
          ...state.highscores,
          [difficulty]: [
            ...(state.highscores[difficulty] || []),
            {
              username,
              time,
              moves,
              missed,
              date: new Date().toISOString(),
              medalScore,
            },
          ]
            .sort((a, b) => {
              if (a.moves === b.moves) {
                return a.time - b.time;
              }
              return a.moves - b.moves;
            })
            .slice(0, 4),
        },
      };

    default:
      return state;
  }
};

export { gameReducer, actionTypes };
