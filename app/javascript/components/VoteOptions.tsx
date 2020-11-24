import React from 'react';

import { Content } from '@jobber/components/Content';
import { RadioGroup, RadioOption } from '@jobber/components/RadioGroup';
import { Button } from '@jobber/components/Button';

import { Game, Word, Answer } from '../models/index';

type Props =  {
  roundAnswers: Answer[];
  onVote: (voted_for_answer: Answer) => void;
};

const VoteOptions: React.FC<Props> = (props) => {
  const [vote, setVote] = React.useState(0);
  const voteChoices = props.roundAnswers.map(function (answer, index) {
    return <RadioOption key={index} value={index} label={answer.definition} />;
  });

  return (
    <div className="game-play-section">
      <Content>
        <Content>
          <RadioGroup onChange={(value: number) => setVote(value)} value={vote}>
            {voteChoices}
          </RadioGroup>
        </Content>
        <Button label="Submit Vote" type="primary" onClick={onVote} />
      </Content>
    </div>
  );

  function onVote() {
    const voted_for_answer: Answer = props.roundAnswers[vote];
    props.onVote(voted_for_answer);
  }
};

export default VoteOptions;
