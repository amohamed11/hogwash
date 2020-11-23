import React from 'react';

import { Content } from '@jobber/components/Content';
import { Card } from '@jobber/components/Card';
import { Button } from '@jobber/components/Button';

import { Player } from '../models/index';

type Props =  {
  players: Player[]
  startGame: () => void;
};

const GameLobby: React.FC<Props> = (props) => {
  const playerList = props.players.map(function (player, index) {
    return <li key={index}>{player.name}</li>;
  });

  return (
    <div className="game-lobby">
      <Content>
        <Card title="Players">
          <ul>
            { playerList }
          </ul>
        </Card>
        <Button label="Start" type="primary" onClick={props.startGame}/>
      </Content>
    </div>
  );
};

export default GameLobby;
