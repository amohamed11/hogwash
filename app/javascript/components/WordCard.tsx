import React from 'react';

import { Content } from '@jobber/components/Content';
import { Card } from '@jobber/components/Card';
import { Heading } from '@jobber/components/Heading';

import { Word } from '../models/index';

type Props = {
  word: Word;
};

const WordCard: React.FC<Props> = (props) => {
  return (
    <div className="word-card">
      <Content spacing="large">
        <Card>
          <Heading level={4}>
            {props.word.word}
          </Heading>
        </Card>
      </Content>
    </div>
  );
};

export default WordCard;
