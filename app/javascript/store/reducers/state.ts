import { Game, Player } from '../../models/index';

export interface RootState {
  game: Game;
  player: Player;
  connected: false;
  error: string | null;
}
