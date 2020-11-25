import React, { useEffect } from 'react';

import { Content } from '@jobber/components/Content';
import { Heading } from '@jobber/components/Heading';
import { Button } from '@jobber/components/Button';

import { Game, Word, Answer, Vote, Player } from '../models/index';
import AnswerInput from '../components/AnswerInput';
import VoteOptions from '../components/VoteOptions';
import RoundResults from '../components/RoundResults';

type Props =  {
  game: Game;
  word: Word;
  player: Player;
  roundAnswers: Answer[];
  roundVotes: Vote[];
  submitAnswer: (definition: string) => void;
  submitVote: (voted_for_answer: Answer) => void;
  getNextWord: () => void;
};

const GamePlaySection: React.FC<Props> = (props) => {
  const [answered, setAnswered] = React.useState(false);
  const [voted, setVoted] = React.useState(false);

  useEffect(() => {
    if (props.roundAnswers.length < 2 && props.roundVotes.length == 0 && answered && voted) {
      setAnswered(false);
      setVoted(false);
    }
  })

  let votingSection;
  let answerSection;
  let waitingSection;
  let roundResults;

  if (!answered) {
    answerSection = <AnswerInput onAnswer={onAnswer} />;
  }
  else if (!voted && props.roundAnswers.length == props.game.players.length+1) {
    votingSection = <VoteOptions roundAnswers={props.roundAnswers} onVote={onVote} />;
  }
  else if (voted && props.roundVotes.length == props.game.players.length) {
    roundResults = (
      <Content>
        <RoundResults votes={props.roundVotes} players={props.game.players}/>
        { props.player.isCreator ? <Button label="Next Word" onClick={onNextWord} /> : null}
      </Content>
    )
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

  function onNextWord() {
    props.getNextWord();
  }
};

export default GamePlaySection;
