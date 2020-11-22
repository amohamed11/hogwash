import React from 'react';

import { List } from '@jobber/components/List';

import WordCard from "./WordCard";
import { Word } from '../models';

type Props = {
  words: Word[];
};

const WordList: React.FC<Props> = (props) => {
  const wordsList = props.words.map(function (word, index) {
    return <WordCard  word={word} key={index}/>;
  });

  return (
    <div className="word-list">
      <ul>
        {wordsList}
      </ul>
    </div>
  );
};

export default WordList;
