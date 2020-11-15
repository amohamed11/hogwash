import * as ACTIONS from '../actionTypes';
import { GameState, Game, Word, Player } from '../../models/index';
import '../../channels/game_channel.js';

const initialState: GameState = {
  game: null as Game,
  player: null as Player,
  session: '',
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.JOIN_GAME: {
      return {
        ...state,
        game: action.payload.game,
        player: action.payload.player_name,
      };
    }

    case ACTIONS.CREATE_GAME: {
      return {
        ...state,
        game: action.payload.game,
        player: action.payload.player_name,
      };
    }

    default:
      return state;
  }
}

// game: {
//   id: action.payload.id,
//   room_code: action.payload.room_code,
//   words: action.payload.words,
//   players: action.payload.players
// },
// player: {
// name: action.payload.player_name,
// score: 0
// }

export default rootReducer;
