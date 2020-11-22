import React, { useContext } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Content } from '@jobber/components/Content';
import { Heading } from '@jobber/components/Heading';

import { ActionCableContext } from "../services/CableContext";
import { Game } from '../models';

const mapStateToProps = state => {
  return {
    game: state.game as Game
  }
};

type Props = ReturnType<typeof mapStateToProps>;

const Game: React.FC<Props> = (props) => {
  const cable = useContext(ActionCableContext);

  if (!props.game || props.game?.done) {
    return <Redirect to={"/"} />;
  }
  
  return (
    <div className="game center">
      <Content spacing="large">
        <Heading level={1}>Hogwash</Heading>
        <Content>
          <Heading level={2}>Room Code: {props.game.room_code}</Heading> 
        </Content>
      </Content>
    </div>
  );
};

export default connect(
  mapStateToProps,
  null
)(Game);
