import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Button } from '@jobber/components/Button';
import { Content } from '@jobber/components/Content';
import { InputText } from '@jobber/components/InputText';
import { Heading } from '@jobber/components/Heading';
import { Form } from '@jobber/components/Form';
import { Select, Option } from '@jobber/components/Select';
import { Divider } from '@jobber/components/Divider';
import { Text } from '@jobber/components/Text';
import { useFormState } from '@jobber/hooks';

import { ActionCableContext } from "../services/CableContext";
import { Game } from '../models';

const mapStateToProps = state => {
  return {
    game: state.game as Game
  }
};

type Props = ReturnType<typeof mapStateToProps>;

const Home: React.FC<Props> = (props) => {
  const [word_count, setWordCount] = React.useState(6);
  const [room_code, setRoomCode] = React.useState('');
  const [player_name, setPlayerName] = React.useState('');

  const [{ isDirty, isValid }, setFormState] = useFormState();

  const cable = useContext(ActionCableContext);

  if (props.game) {
    return <Redirect push to={"/game/"+props.game.room_code} />;
  }

  return (
    <div className="home center">
      <Content spacing="large">
        <Heading level={1}>Hogwash</Heading>

        <div className="name-input center">
          <InputText
            onChange={(value: string) => setPlayerName(value)}
            defaultValue=""
            placeholder="Enter your name"
            validations={{
              required: {
                value: true,
                message: 'Please enter a name',
              },
              minLength: {
                value: 1,
                message: 'Name must be at least 1 letters.',
              },
            }}
          />
        </div>

        <Divider />

        <div className="join-input-group  center">
          <Heading level={5}>Join a game</Heading>
          <Form onSubmit={() => joinGame(player_name, room_code)} onStateChange={setFormState}>
            <Content>
                <Content>
                  <InputText
                    onChange={(value: string) => setRoomCode(value)}
                    defaultValue=""
                    placeholder="Enter the game code"
                    validations={{
                      required: {
                        value: true,
                        message: 'Please enter a game code',
                      },
                      minLength: {
                        value: 5,
                        message: 'Game Code must be 5 characters.',
                      },
                    }}
                  />
                </Content>
              <Button label="Join" type="primary" submit={true} disabled={!isDirty || !isValid} />
            </Content>
          </Form>
        </div>

        <div className="create-select-group  center">
          <Heading level={5}>Create a game</Heading>
          <Form onSubmit={() => createGame(player_name, word_count)} onStateChange={setFormState}>
            <Content>
                <Content>
                  <Select
                    value={word_count}
                    onChange={(value: string) => setWordCount(parseInt(value))}
                  >
                    <Option value="6">6</Option>
                    <Option value="8">8</Option>
                    <Option value="10">10</Option>
                    <Option value="12">12</Option>
                  </Select>
                </Content>
              <Text>Select how many words to be in the game.</Text>
              <Button label="Create" type="primary" submit={true} />
            </Content>
          </Form>
        </div>

      </Content>
    </div>
  );

  function joinGame(player_name: string, room_code: string) {
    cable.perform("onJoinGame", {player_name: player_name, room_code: room_code});
  }

  function createGame(player_name: string, word_count: number) {
    cable.perform("onCreateGame", {player_name: player_name, word_count: word_count});
  }
};

export default connect(
  mapStateToProps,
  null
)(Home);
