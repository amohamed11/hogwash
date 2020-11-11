import * as React from 'react';
import { Button } from '@jobber/components/Button';
import { Content } from '@jobber/components/Content';
import { InputText } from '@jobber/components/InputText';
import { Heading } from '@jobber/components/Heading';
import { Form } from '@jobber/components/Form';
import { useFormState } from "@jobber/hooks";

interface IProps {
  cable: any;
}

interface IState {
  word_count: number;
  room_code: string;
  player_name: string;
}

const Home: React.FC<IProps> = props => {
  const [{ isDirty, isValid }, setFormState] = useFormState();
  const [word_count, setWordCount] = React.useState(0);
  const [room_code, setRoomCode] = React.useState("");
  const [player_name, setPlayerName] = React.useState("");

  return (
    <div className="home center">
      <Content spacing="large">
        <Heading level={1}>Hogwash</Heading>
        <Form
          onSubmit={() => alert('Submitted 🎉🎉🎉')}
          onStateChange={setFormState}
        >
          <Content >
            <div className="input-group center">
              <Content>
                <InputText
                  onChange={(value) => setPlayerName(value)}
                  defaultValue=""
                  placeholder="Enter name"
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
                <InputText
                  onChange={(value) => setRoomCode(value)}
                  defaultValue=""
                  placeholder="Enter Game Code"
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
            </div>
            <Button
              label="Join Game"
              type="primary"
              submit={true}
              disabled={!isDirty || !isValid}
            />
            </Content>
        </Form>
        <Button 
          label="Create Game" 
          type="primary" 
          onClick={() => 
            props.cable.createGame({ word_count: 5 })
          } 
        />
      </Content>
    </div>
  );
}

export default Home;
