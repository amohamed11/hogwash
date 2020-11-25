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
  const shuffeldAnswers = React.useMemo(() => {
    return shuffleArray(props.roundAnswers);
  }, []);
  const voteChoices = shuffeldAnswers.map(function (answer, index) {
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
