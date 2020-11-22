import React from 'react';

import { Content } from '@jobber/components/Content';
import { Card } from '@jobber/components/Card';
import { Text } from '@jobber/components/Text';

import { Word } from '../models';

type Props = {
  word: Word;
};

const WordCard: React.FC<Props> = (props) => {
  return (
    <div className="word-card">
      <Card title={props.word.word}>
        <Content spacing="large">
          <Text>
            {props.word.definition}
          </Text>
        </Content>
      </Card>
    </div>
  );
};

export default WordCard;
