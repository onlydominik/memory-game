import {
  GameSessionState,
  GameSessionAction,
  actionTypes,
} from './gameSessionReducerTypes';

const initialState: GameSessionState = {
  moves: 0,
  missed: 0,
  flippedCards: [],
  matchedCards: [],
  gameStatus: 'pending',
  time: 0,
};

const gameSessionReducer = (
  state: GameSessionState,
  action: GameSessionAction
): GameSessionState => {
  switch (action.type) {
    case actionTypes.SET_MOVE: {
      const newMove = state.moves + 1;
      const numberOfPairs = state.matchedCards.length;
      return {
        ...state,
        moves: newMove,
        missed: newMove - numberOfPairs,
      };
    }

    case actionTypes.SET_FLIPPED_CARD:
      if (state.flippedCards.length === 2) {
        return {
          ...state,
          flippedCards: [action.payload],
        };
      }

      return {
        ...state,
        flippedCards: [...state.flippedCards, action.payload],
      };

    case actionTypes.RESET_FLIPPED_CARDS:
      return { ...state, flippedCards: [] };

    case actionTypes.SET_MATCHED_CARD:
      return {
        ...state,
        matchedCards: [...state.matchedCards, action.payload],
        flippedCards: [],
      };

    case actionTypes.SET_GAME_STATUS:
      return {
        ...state,
        gameStatus: action.payload,
      };

    case actionTypes.SET_TIME:
      return {
        ...state,
        time: action.payload,
      };

    default:
      console.error(
        'Not Valid Action Type: gameSessionReducer | Returning previous state ...'
      );
      return state;
  }
};

export { gameSessionReducer, initialState };
