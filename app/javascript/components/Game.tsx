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
    <div className="game center">
      <Content spacing="large">
        <Heading level={1}>Hogwash</Heading>
        <Content>
            
        </Content>
      </Content>
    </div>
  );
}

export default Home;
