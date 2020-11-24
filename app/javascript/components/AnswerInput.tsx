import React, { useEffect } from 'react';

import { Content } from '@jobber/components/Content';
import { InputText } from '@jobber/components/InputText';
import { Button } from '@jobber/components/Button';
import { Form } from '@jobber/components/Form';
import { showToast } from '@jobber/components/Toast';
import { useFormState } from '@jobber/hooks';

type Props =  {
  onAnswer: (answer: string) => void;
};

const AnswerInput: React.FC<Props> = (props) => {
  const [answer, setAnswer] = React.useState('');
  const [{ isDirty, isValid }, setFormState] = useFormState();

  useEffect(() => {
    setAnswer(answer);
  });

  return (
    <div className="game-answer-input">
      <Form onSubmit={onAnswer} onStateChange={setFormState}>
        <Content>
          <Content>
            <InputText
              onChange={(value: string) => setAnswer(value)}
              defaultValue=""
              placeholder="Enter your answer"
              validations={{
                required: {
                  value: true,
                  message: 'Please enter an answer first'
              }
              }}
            />
          </Content>
          <Button label="Submit Answer" type="primary" submit={true} disabled={!isDirty || !isValid} />
        </Content>
      </Form>
    </div>
  );

  function onAnswer() {
    showToast({
      message: "Answer submitted"
    })
    props.onAnswer(answer);
  }
};

export default AnswerInput;
