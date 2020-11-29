import * as ACTIONS from '../actions/actionTypes';
import { Game, Word, Player, Answer, Vote } from '../../models/index';
import { RootState } from './state';

// Initial Store State
var initialState: RootState = {
  game: null as Game,
  player: null as Player,
  word: null as Word,
  correctSubmission: null as Answer,
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

    case ACTIONS.GAME_STARTED:{
      const currentWord: Word = action.game.words[action.game.current_word];
      const correctAnswer: Answer = { answerer_id: -1, definition: currentWord.definition };
      return {
        ...state,
        game: {
          ...state.game,
          started: action.game.started,
          done: action.game.done,
          current_word: action.game.current_word
        },
        correctSubmission: null,
        roundAnswers: [correctAnswer],
        word: currentWord,
        error: action.error
      };
    }

    case ACTIONS.GAME_NEXT_WORD:{
      const currentWord: Word = state.game.words[action.game.current_word];
      const correctAnswer: Answer = { answerer_id: -1, definition: currentWord.definition };
      return {
        ...state,
        game: {
          ...state.game,
          current_word: action.game.current_word,
          players: action.game.players
        },
        correctSubmission: null,
        roundAnswers: [correctAnswer],
        roundVotes: [],
        word: currentWord
      };
    }

    case ACTIONS.GAME_CORRECT_SUBMISSION:{
      return {
        ...state,
        correctSubmission: action.answer
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

    case ACTIONS.GAME_ENDED:
      return {
        ...state,
        game: action.game,
        roundAnswers: [],
        roundVotes: [],
        word: null,
        correctSubmission: null
      };

    case ACTIONS.GAME_LOBBY_CLOSED:
      return {
        ...initialState,
        connected: true
      };

    default:
      return state;
  }
}
