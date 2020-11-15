import * as ACTIONS from './actionTypes';
import { Game } from '../../models/index';

export const gameJoined = (game: Game) => {
  type: typeof ACTIONS.JOIN_GAME;
  payload: game;
};

export const gameCreated = (game: Game) => {
  type: typeof ACTIONS.CREATE_GAME;
  payload: game;
};