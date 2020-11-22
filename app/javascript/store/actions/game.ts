import * as ACTIONS from './actionTypes';
import { Game } from '../../models/index';

export const gameJoined = (game: Game) => {
  type: typeof ACTIONS.GAME_JOINED;
  payload: game;
};

export const gameCreated = (game: Game) => {
  type: typeof ACTIONS.GAME_CREATED;
  payload: game;
};