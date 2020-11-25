import React from 'react';

import { Content } from '@jobber/components/Content';
import { Card } from '@jobber/components/Card';

import { Player, Vote } from '../models/index';

type Props =  {
  votes: Vote[];
  players: Player[];
};

const RoundResults: React.FC<Props> = (props) => {
  let countedVotes = new Map();
  props.votes.forEach((vote) => {
    if (countedVotes.has(vote.definition)) {
      let count = countedVotes.get(vote.definition) + 1;
      countedVotes.set(vote.definition, count);
    } else {
      countedVotes.set(vote.definition, 1);
    }
  });

  let sortedCountedVotes = new Map([...countedVotes.entries()].sort());
  let voteList = [];
  sortedCountedVotes.forEach((count, definition) => {
    voteList.push(<li>{definition}: {count}</li>);
  });

  return (
    <div className="game-round-results">
      <Content>
        <Card title="Round Results">
          <ul>
            { voteList }
          </ul>
        </Card>
      </Content>
    </div>
  );
};

export default RoundResults;
