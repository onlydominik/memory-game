export interface GameSessionState {
  moves: number;
  missed: number;
  flippedCards: Array<{ id: number; index: number }>;
  matchedCards: number[];
  gameStatus: 'pending' | 'inProgress' | 'win';
  time: number;
}

export type GameSessionDispatch = React.Dispatch<GameSessionAction>;

export const actionTypes = {
  SET_MOVE: 'SET_MOVE',
  SET_FLIPPED_CARD: 'SET_FLIPPED_CARD',
  RESET_FLIPPED_CARDS: 'RESET_FLIPPED_CARDS',
  SET_MATCHED_CARD: 'SET_MATCHED_CARD',
  SET_GAME_STATUS: 'SET_GAME_STATUS',
  SET_TIME: 'SET_TIME',
} as const;

interface SetMoveAction {
  type: typeof actionTypes.SET_MOVE;
}

interface SetFlippedCardAction {
  type: typeof actionTypes.SET_FLIPPED_CARD;
  payload: {
    id: number;
    index: number;
  };
}

interface ResetFlippedCardsAction {
  type: typeof actionTypes.RESET_FLIPPED_CARDS;
}

interface SetMatchedCardAction {
  type: typeof actionTypes.SET_MATCHED_CARD;
  payload: number;
}

interface SetGameStatusAction {
  type: typeof actionTypes.SET_GAME_STATUS;
  payload: GameSessionState['gameStatus'];
}

interface SetTimeAction {
  type: typeof actionTypes.SET_TIME;
  payload: number;
}

export type GameSessionAction =
  | SetMoveAction
  | SetFlippedCardAction
  | ResetFlippedCardsAction
  | SetMatchedCardAction
  | SetGameStatusAction
  | SetTimeAction;
