import * as ACTIONS from '../actions/actionTypes';
import { Game, Player } from '../../models/index';
import { RootState } from './state';

// Initial Store State
var initialState: RootState = {
  game: null as Game,
  player: null as Player,
  connected: false,
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

    case ACTIONS.GAME_CREATED || ACTIONS.GAME_JOINED:
      return {
        ...state,
        game: action.game,
        player: action.player,
      };

    default:
      return state;
  }
}
