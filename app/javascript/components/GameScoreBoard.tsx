import React from 'react';

import { Content } from '@jobber/components/Content';
import { Card } from '@jobber/components/Card';
import { Button } from '@jobber/components/Button';

import { Player } from '../models/index';

type Props =  {
  players: Player[];
  player: Player;
};

const GameScoreBoard: React.FC<Props> = (props) => {
  let sortedPlayerList = props.players.sort((a, b) => b.score - a.score);
  const playerList = props.players.map(function (player, index) {
    return (
      <li className={player == props.player ? "player-score" : ""} key={index}>
        {player.name}: &#9; {player.score}
      </li>
    );
  });

  return (
    <div className="game-scoreboard">
      <Content>
        <Card title="Scoreboard">
          <ul>
            { playerList }
          </ul>
        </Card>
      </Content>
    </div>
  );
};

export default GameScoreBoard;
