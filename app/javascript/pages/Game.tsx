import React from 'react';
import { Content } from '@jobber/components/Content';
import { Heading } from '@jobber/components/Heading';

interface IProps {
  cable: any;
}

const Game: React.FC<IProps> = (props) => {
  return (
    <div className="game center">
      <Content spacing="large">
        <Heading level={1}>Hogwash</Heading>
        <Content>
          Placeholder
        </Content>
      </Content>
    </div>
  );
};

export default Game;
