import React from 'react';

import { Content } from '@jobber/components/Content';
import { Heading } from '@jobber/components/Heading';
import { Button } from '@jobber/components/Button';

import { Game, Word, Answer } from '../models/index';
import AnswerInput from '../components/AnswerInput';
import VoteOptions from '../components/VoteOptions';

type Props =  {
  game: Game;
  word: Word;
  roundAnswers: Answer[];
  submitAnswer: (definition: string) => void;
  submitVote: (voted_for_answer: Answer) => void;
};

const GamePlaySection: React.FC<Props> = (props) => {
  const [answered, setAnswered] = React.useState(false);
  const [voted, setVoted] = React.useState(false);

  let votingSection;
  let answerSection;
  let waitingSection;

  if (!answered) {
    answerSection = <AnswerInput onAnswer={onAnswer} />;
  } else if (!voted && props.game.players.length == props.roundAnswers.length) {
    votingSection = <VoteOptions roundAnswers={props.roundAnswers} onVote={onVote} />;
  } else {
    waitingSection = (
      <Content>
        <Heading level={5}>Waiting on other players ...</Heading>
      </Content>
    );
  }

  return (
    <div className="game-play-section">
      <Content>
        <Heading level={4}>{props.word.word}</Heading>
        {votingSection}
        {answerSection}
        {waitingSection}
      </Content>
    </div>
  );

  function onAnswer(defintion: string) {
    setAnswered(true);
    props.submitAnswer(defintion);
  }

  function onVote(voted_for_answer: Answer) {
    setVoted(true);
    props.submitVote(voted_for_answer);
  }
};

export default GamePlaySection;
