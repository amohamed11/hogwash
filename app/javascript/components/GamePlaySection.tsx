import React from 'react';

import { Content } from '@jobber/components/Content';
import { Heading } from '@jobber/components/Heading';

import { Game, Word, Answer, Vote } from '../models/index';
import AnswerInput from '../components/AnswerInput';
import VoteOptions from '../components/VoteOptions';
import RoundResults from '../components/RoundResults';

type Props =  {
  game: Game;
  word: Word;
  roundAnswers: Answer[];
  roundVotes: Vote[];
  submitAnswer: (definition: string) => void;
  submitVote: (voted_for_answer: Answer) => void;
};

const GamePlaySection: React.FC<Props> = (props) => {
  const [answered, setAnswered] = React.useState(false);
  const [voted, setVoted] = React.useState(false);

  let votingSection;
  let answerSection;
  let waitingSection;
  let roundResults;

  if (!answered) {
    answerSection = <AnswerInput onAnswer={onAnswer} />;
  }
  /* check if user voted & collected answers are the size of the players +1 for correct definition */
  else if (!voted && props.roundAnswers.length == props.game.players.length+1) {
    votingSection = <VoteOptions roundAnswers={props.roundAnswers} onVote={onVote} />;
  }
  else if (voted && props.roundVotes.length == props.game.players.length) {
    roundResults = <RoundResults votes={props.roundVotes} players={props.game.players}/>
  }
  else {
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
        {roundResults}
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
