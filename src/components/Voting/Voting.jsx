import { Component } from 'react';
import SmileCard from '../SmileCard/SmileCard';
import './Voting.scss';

export default class Voting extends Component {
  state = {
    candidates: [],
    votes: {},
    showResults: false,
  };

  handleVote = (id) => {
    this.setState({
      votes: {
        ...this.state.votes,
        [id]: this.state.votes[id] + 1,
      }
    });
  };

  toggleResults = () => {
    this.setState(prevState => ({
      showResults: !prevState.showResults,
    }));
  };

  componentDidMount() {
    fetch('http://localhost:3000/data.json')
      .then(res => res.json())
      .then(result => {
        const votes = result.reduce((acc, item) => {
          acc[item.id] = 0;
          return acc;
        }, {});
        this.setState({
          candidates: result,
          votes: votes,
        });
      });
  }

  getWinners = () => {
    const { votes, candidates } = this.state;
    let maxVotes = 0;

    for (const id in votes) {
      if (votes[id] > maxVotes) {
        maxVotes = votes[id];
      }
    }

    return candidates.filter(candidate => votes[candidate.id] === maxVotes);
  };

  render() {
    const winners = this.getWinners();

    return (
      <div>
        <h1>Choose the best smile ever:</h1>
        <div className='container'>
          {!this.state.candidates.length && <div>No candidates yet...</div>}

          {this.state.candidates.map(item => (
            <div key={item.id}>
              <SmileCard
                id={item.id}
                title={item.title}
                description={item.description}
                smile={item.smile}
                onVote={this.handleVote}
              />
              {this.state.showResults && this.state.votes[item.id]}
            </div>
          ))}
        </div>
        <button onClick={this.toggleResults}>
          {this.state.showResults ? 'Hide Results' : 'Show Results'}
        </button>
        {this.state.showResults && winners.length > 0 && (
          <div>
            {winners.length > 1 ? 'The same number of votes are cast for: ' : 'The winner is: '}
            {winners.map(winner => winner.title).join(' and ')}
          </div>
        )}
      </div>
    );
  }
}
