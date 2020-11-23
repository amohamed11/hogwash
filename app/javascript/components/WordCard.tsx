import React from 'react';

import { Content } from '@jobber/components/Content';
import { Card } from '@jobber/components/Card';
import { Heading } from '@jobber/components/Heading';

type Props = {
  word: string;
};

const WordCard: React.FC<Props> = (props) => {
  return (
    <div className="word-card">
      <Content spacing="large">
        <Card>
          <Heading level={4}>
            {props.word}
          </Heading>
        </Card>
      </Content>
    </div>
  );
};

export default WordCard;
