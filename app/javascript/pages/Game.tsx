import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Content } from '@jobber/components/Content';
import { Heading } from '@jobber/components/Heading';
import { showToast } from '@jobber/components/Toast';

import GameLobby from "../components/GameLobby";
import GameScoreBoard from "../components/GameScoreBoard";
import GamePlaySection from "../components/GamePlaySection";
import { ActionCableContext } from "../services/CableContext";
import { Game, Word, Player, Answer, Vote } from '../models';

const mapStateToProps = state => {
  return {
    game: state.game as Game,
    player: state.player as Player,
    word: state.word as Word,
    roundAnswers: state.roundAnswers as Answer[],
    roundVotes: state.roundVotes as Vote[]
  }
};

type Props = ReturnType<typeof mapStateToProps>;

const Game: React.FC<Props> = (props) => {
  const cable = useContext(ActionCableContext);
  let gameScreen;

  if (!props.game || props.game?.done) {
    return <Redirect to={"/"} />;
  }

  if (!props.game.started) {
    gameScreen = <GameLobby players={props.game.players} isCreator={props.player.isCreator} startGame={startGame} />
  } else {
    gameScreen = (
      <Content>
        <div className="wrapper">
          <GameScoreBoard players={props.game.players} player={props.player} />
          <GamePlaySection
            game={props.game}
            word={props.word}
            player={props.player}
            roundAnswers={props.roundAnswers}
            roundVotes={props.roundVotes}
            submitAnswer={submitAnswer}
            submitVote={submitVote}
            getNextWord={getNextWord}
          />
        </div>
      </Content>
    )
  }

  return (
    <div className="game">
      <div className="game-header">
        <Link to="/">
          <Heading level={1}>Hogwash</Heading>
        </Link>
        <Heading level={3}>Code: {props.game.room_code}</Heading>
      </div>
      <div className="game-screen">
        <Content spacing="large">
          { gameScreen }
        </Content>
      </div>
    </div>
  );

  function startGame() {
    if (props.game.players.length < 2) {
      showToast({
        message: "Minimum of 2 players are required",
        variation: "error"
      })
    } else {
      cable.perform("onGameStart");
    }
  }

  function submitAnswer(definition: string) {
    cable.perform("onAnswer", {player_id: props.player.id, answer: definition});
  }

  function submitVote(voted_for_answer: Answer) {
    cable.perform("onVote", {player_id: props.player.id, definition: voted_for_answer.definition, voted_for_id: voted_for_answer.answerer_id});
  }

  function getNextWord() {
    cable.perform("onNextWord")
  }
};

export default connect(
  mapStateToProps,
  null
)(Game);
