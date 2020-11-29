import React from 'react';

import { Content } from '@jobber/components/Content';
import { Card } from '@jobber/components/Card';
import { Button } from '@jobber/components/Button';
import { Heading } from '@jobber/components/Heading';

import { Game } from '../models/index';

type Props =  {
  game: Game;
  isCreator: boolean;
  startGame: () => void;
  closeGameRoom: () => void;
};

const GameEndScreen: React.FC<Props> = (props) => {
  let sortedPlayerList = props.game.players.slice();
  sortedPlayerList.sort((a, b) => b.score - a.score);

  const playerList = sortedPlayerList.map(function (player, index) {
    if (index != 0) {
      return <p key={index}>{player.name}: {player.score}</p>;
    }
  });

  let restartButton;
  if (props.isCreator) {
    restartButton = <Button label="Restart Game" type="primary" onClick={props.startGame} />
  }

  let closeButton;
  if (props.isCreator) {
    closeButton = <Button label="Close Lobby" type="primary" variation="destructive" onClick={props.closeGameRoom} />
  }

  return (
    <div className="game-end-screen center">
      <Content>
        <Card title="Game Ended">
          <Content>
            <Heading level={3}>Winner: {sortedPlayerList[0].name} </Heading>
            <Heading level={5}>Score: {sortedPlayerList[0].score} </Heading>
            { playerList }
          </Content>
        </Card>
        { restartButton }
      </Content>
      { closeButton }
    </div>
  );
};

export default GameEndScreen;
