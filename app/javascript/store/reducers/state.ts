import { Game, Word, Player, Answer } from '../../models/index';

export interface RootState {
  game: Game;
  player: Player;
  word: Word;
  roundAnswers: Answer[];
  connected: false;
  error: string | null;
}
