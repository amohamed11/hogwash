import * as ACTIONS from '../actionTypes';
import { GameState, Game, Word, Player } from '../../models/index';

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
        game: action.payload
      } as GameState;
    }

    case ACTIONS.CREATE_GAME: {
      console.log("GAME CREATED");
      return {
        ...state,
        game: action.payload.game as Game
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
