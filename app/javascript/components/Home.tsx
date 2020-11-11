import * as React from 'react';
import { Button } from "@jobber/components/Button";

interface Props {
  cable: any
};

class Home extends React.Component<Props> {
  render(){
    return (
      <div>
        <h1>
          This works.
        </h1>
        <Button 
          label="Join Game" 
          type="primary" 
          onClick={() => 
            this.props.cable.joinGame({"room_code": "NANI"})
          } 
        />
      </div>
    );
  }
}

export default Home;