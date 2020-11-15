import * as connectionActions from '../actions/connection';

let socket;

const onOpen = (ws, store, code) => evt => {
  console.log("WS OPEN");
}

const onClose = (ws, store) => evt => {
  console.log("WS CLOSE");
}

const onMessage = (ws, store) => evt => {
  let msg = JSON.parse(evt.data);
  console.log("FROM RAILS: ", msg);

  if (msg.type === "ping") {
    return;
  }

  console.log("FROM RAILS: ", msg);

  const connectionState = store.getState().connection.state;
  const gameCode = store.getState().game.room_code;

  if (connectionState === 'OPENING') {
    if (msg.type === 'welcome') {
      store.dispatch(connectionActions.subscribing());
      const msg = {
        command: 'subscribe',
        identifier: JSON.stringify({
          channel: 'GameChannel',
        }),
      };
      socket.send(JSON.stringify(msg));
    } else {
      console.error('WS ERRORED!');
    }

  } else if (connectionState === 'SUBSCRIBING') {
    if (msg.type === 'confirm_subscription') {
      store.dispatch(connectionActions.ready());
      const msg = {
        command: 'message',
        identifier: JSON.stringify({
          channel: 'GameChannel',
        }),
        data: JSON.stringify({
          action: 'join',
          code: gameCode,
        }),
      };
      socket.send(JSON.stringify(msg));
    } else {
      console.error('WS ERRORED!');
    }

  } else {
    store.dispatch(msg.message);
  }
}

export default store => next => action => {
  const match = /^WS_(.+)$/.exec(action.type);
  if (!match) {
    return next(action);
  }

  const wsAction = { ...action, type: match[1] };
  if (wsAction.type === 'CONNECT') {
    if (socket) {
      socket.close();
    }

    const { code } = wsAction.payload;

    socket = new WebSocket("wss://localhost:3000/cable");
    socket.onmessage = onMessage(socket, store);
    socket.onclose = onClose(socket, store);
    socket.onopen = onOpen(socket, store, code);

    store.dispatch(connectionActions.opening());

  } else if (wsAction.type === 'SUBSCRIBE') {
    const msg = {
      command: 'subscribe',
      identifier: JSON.stringify({
        channel: 'GameChannel',
      }),
    };

    socket.send(JSON.stringify(msg));
    store.dispatch(connectionActions.subscribing())

  } else {
    const msg = {
      command: 'message',
      identifier: JSON.stringify({
        channel: 'GameChannel',
      }),
      data: JSON.stringify({
        ...action,
        action: wsAction.type.toLowerCase(),
      }),
    };

    socket.send(JSON.stringify(msg));
    next(action);
  }
};
