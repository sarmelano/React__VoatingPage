import { Component } from 'react';
import Voting from '../Voting/Voting.jsx';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Voting />
      </div>
    );
  }
}

export default App;
