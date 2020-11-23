import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import { Content } from '@jobber/components/Content';
import { Heading } from '@jobber/components/Heading';
import { showToast } from '@jobber/components/Toast';

import WordCard from "../components/WordCard";
import GameLobby from "../components/GameLobby";
import { ActionCableContext } from "../services/CableContext";
import { Game, Player } from '../models';

const mapStateToProps = state => {
  return {
    game: state.game as Game,
    player: state.player as Player
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
        <WordCard word={props.game.currentWord}/>
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
      <div className="game-screen center">
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
};

export default connect(
  mapStateToProps,
  null
)(Game);
