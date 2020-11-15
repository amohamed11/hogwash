import * as ACTIONS from './actionTypes';
import { Game } from '../models/index';
import consumer from '../channels/consumer';

const gameChannel = consumer.subscriptions.subscriptions[0];

export const joinGame = (game: Game) => {
  type: typeof ACTIONS.JOIN_GAME;
  payload: game;
};

export const createGameMessage = (creator_name: string) => {
  type: typeof ACTIONS.JOIN_GAME;
  payload: creator_name;
};

export const createGameSuccess = (game: Game) => {
  type: typeof ACTIONS.JOIN_GAME;
  payload: game;
};

export function createRoom(creator_name) {
  return async function (dispatch) {
      dispatch(createGameMessage(creator_name));
  }
}
