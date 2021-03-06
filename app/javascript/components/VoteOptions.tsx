import React from 'react';

import { Content } from '@jobber/components/Content';
import { RadioGroup, RadioOption } from '@jobber/components/RadioGroup';
import { Button } from '@jobber/components/Button';

import { Answer } from '../models/index';

type Props =  {
  roundAnswers: Answer[];
  onVote: (voted_for_answer: Answer) => void;
};

const VoteOptions: React.FC<Props> = (props) => {
  const [vote, setVote] = React.useState('');
  const shuffeldAnswers = React.useMemo(() => {
    return shuffleArray(props.roundAnswers).filter(answer => answer.definition !== "");
  }, []);

  const voteChoices = shuffeldAnswers.map(function (answer, index) {
    return <RadioOption key={index} value={answer.definition} label={answer.definition} />;
  });

  return (
    <div className="game-vote-options">
      <Content>
        <Content>
          <RadioGroup onChange={(value: string) => setVote(value)} value={vote}>
            {voteChoices}
          </RadioGroup>
        </Content>
        <Button label="Submit Vote" type="primary" onClick={onVote} />
      </Content>
    </div>
  );

  function onVote() {
    const voted_for_answer: Answer = props.roundAnswers.find(a => a.definition == vote);
    props.onVote(voted_for_answer);
  }

  /* Randomize array in-place using Durstenfeld shuffle algorithm 
   * Source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
   * */
  function shuffleArray(array: Answer[]): Answer[] {
    const arrayCopy = array.slice();
    for (var i = arrayCopy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arrayCopy[i];
      arrayCopy[i] = arrayCopy[j];
      arrayCopy[j] = temp;
    }

    return arrayCopy;
  }
};

export default VoteOptions;
