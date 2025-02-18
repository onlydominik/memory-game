import type { GameCoreDispatch } from '@reducers/gameReducer/gameReducerTypes';
import type {
  Challenges,
  GameContextStateValue,
  HighscoresByChallenge,
} from '@typings/index';

export interface GameContextType {
  state: GameContextStateValue;
  dispatch: GameCoreDispatch;
}

export interface CurrentUserData {
  username: string;
  isAnonymous: boolean;
}

export type GameProviderProps = {
  children: React.ReactNode;
};

export interface FirestoreData {
  challenges: Challenges;
  highscores: HighscoresByChallenge;
}
