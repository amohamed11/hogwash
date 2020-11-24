import { Game, Word, Player } from '../../models/index';

export interface RootState {
  game: Game;
  player: Player;
  word: Word;
  connected: false;
  error: string | null;
}
