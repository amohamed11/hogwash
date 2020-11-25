import * as ACTIONS from '../actions/actionTypes';
import { Game, Word, Player, Answer, Vote } from '../../models/index';
import { RootState } from './state';

// Initial Store State
var initialState: RootState = {
  game: null as Game,
  player: null as Player,
  word: null as Word,
  roundAnswers: [] as Answer[],
  roundVotes: [] as Vote[],
  connected: false,
  error: null
};

// Redux Reducer function
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CABLECAR_CONNECTED':
      return {
        ...state,
        connected: true,
      };

    case 'CABLECAR_DISCONNECTED':
      return {
        ...state,
        connected: false,
      };

    case ACTIONS.GAME_CREATED:
    case ACTIONS.GAME_JOINED:{
      const player: Player = state.player || action.player;
      return {
        ...state,
        game: action.game,
        player: player,
        error: action.error
      };
    }

    case ACTIONS.GAME_ROUND_ENDED:{
      const currentWord: Word = state.game.words[action.game.current_word];
      const correctAnswer: Answer = { answerer_id: -1, definition: currentWord.definition };
      return {
        ...state,
        game: {
          ...state.game,
          current_word: action.game.current_word
        },
        roundAnswers: [correctAnswer],
        roundVotes: [],
        word: currentWord
      };
    }

    case ACTIONS.GAME_STARTED:{
      const currentWord: Word = state.game.words[action.game.current_word];
      const correctAnswer: Answer = { answerer_id: -1, definition: currentWord.definition };
      return {
        ...state,
        game: {
          ...state.game,
          started: action.game.started,
          current_word: action.game.current_word
        },
        roundAnswers: [...state.roundAnswers, correctAnswer],
        word: currentWord,
        error: action.error
      };
    }

    case ACTIONS.GAME_PLAYER_ANSWERED:
      return {
        ...state,
        roundAnswers: [...state.roundAnswers, action.answer]
      };

    case ACTIONS.GAME_PLAYER_VOTED:
      return {
        ...state,
        roundVotes: [...state.roundVotes, action.vote]
      };

    default:
      return state;
  }
}
