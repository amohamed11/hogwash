import * as ACTIONS from '../actions/actionTypes';
import { Game, Player } from '../../models/index';
import { RootState } from './state';

// Initial Store State
var initialState: RootState = {
  game: null as Game,
  player: null as Player,
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
    case ACTIONS.GAME_JOINED:
      const player: Player = state.player || action.player;
      return {
        ...state,
        game: action.game,
        player: player,
        error: action.error
      };

    case ACTIONS.GAME_STARTED:
      return {
        ...state,
        game: {
          ...state.game,
          started: action.started
        },
        error: action.error
      };

    default:
      return state;
  }
}
