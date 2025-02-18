import {
  GameSessionDispatch,
  GameSessionState,
} from '@reducers/gameSessionReducer/gameSessionReducerTypes';

export interface GameStatPanelProps {
  moves: number;
  missed: number;
  gameStatus: GameSessionState['gameStatus'];
  gameSessionDispatch: GameSessionDispatch;
}

export interface StatItemProps {
  label: string;
  value: number;
}

export interface TimerProps {
  gameStatus: GameSessionState['gameStatus'];
  timer: number;
}
