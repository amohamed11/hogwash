import React from 'react';

import { Content } from '@jobber/components/Content';
import { Card } from '@jobber/components/Card';
import { Heading } from '@jobber/components/Heading';

import { Player, Vote, Word, Answer } from '../models/index';

type Props =  {
  votes: Vote[];
  players: Player[];
  word: Word;
  correctSubmission: Answer;
};

const RoundResults: React.FC<Props> = (props) => {
  let countedVotes = new Map();
  let voteList = [];
  let correctPlayer = props.players.find(p => p.id == props.correctSubmission?.answerer_id);

  if (!props.correctSubmission) {
    props.votes.forEach((vote) => {
      if (countedVotes.has(vote.definition)) {
        let count = countedVotes.get(vote.definition) + 1;
        countedVotes.set(vote.definition, count);
      } else {
        countedVotes.set(vote.definition, 1);
      }
    });

    let sortedCountedVotes = new Map([...countedVotes.entries()].sort());
    sortedCountedVotes.forEach((count, definition) => {
      voteList.push(<li key={definition}>{definition}: {count}</li>);
    });
  }

  return (
    <div className="game-round-results">
      <Content>
        <Card title="Round Results">
          <Content>
            <Heading level={4}>Actual Definition: {props.word.definition}</Heading>
            { correctPlayer ? <Heading level={5}>Correct Answer by: {correctPlayer.name}</Heading> : null }
            <ul>
              { voteList }
            </ul>
          </Content>
        </Card>
      </Content>
    </div>
  );
};

export default RoundResults;
