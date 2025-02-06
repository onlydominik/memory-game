import {
  GameSessionDispatch,
  GameSessionState,
} from '../../reducers/gameSessionReducer/gameSessionReducerTypes';

export interface GameStatPanelProps {
  gameStatus: GameSessionState['gameStatus']; // Remove from Partial<GameSessionState>
  gameSessionDispatch: GameSessionDispatch;
  moves: number;
  missed: number;
}

export interface StatItemProps {
  label: string;
  value: number;
}

export interface TimerProps {
  gameStatus: GameSessionState['gameStatus'] | undefined;
  timer: number;
}
