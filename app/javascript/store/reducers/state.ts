import { Game, Word, Player, Answer, Vote } from '../../models/index';

export interface RootState {
  game: Game;
  player: Player;
  word: Word;
  correctSubmission: Answer;
  roundAnswers: Answer[];
  roundVotes: Vote[];
  connected: false;
  error: string | null;
}
