import { Component } from 'react'
import SmileCard from '../SmileCard/SmileCard'
import './Voting.scss';

export default class Voting extends Component {
  state = {
    candidates: [],
    votes: {},
    showResults: false, // новое состояние
  }

  handleVote = (id) => {
    this.setState({
      votes: {
        ...this.state.votes,
        [id]: this.state.votes[id] + 1,
      }
    });
  }

  toggleResults = () => {
    this.setState(prevState => ({
      showResults: !prevState.showResults
    }));
  }

  componentDidMount() {
    fetch('http://localhost:3000/data.json')
      .then(res => res.json())
      .then(result => {
        console.log(result);
        const votes = result.reduce((acc, item) => {
          acc[item.id] = 0;
          return acc;
        }, {});
        this.setState({
          candidates: result,
          votes: votes
        })
      });
  }
  

  render() {
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
              {this.state.showResults && this.state.votes[item.id]} {/* отображаем результаты только если showResults === true */}
            </div>
          ))}
        </div>
        <button onClick={this.toggleResults}>
          {this.state.showResults ? 'Hide Results' : 'Show Results'}
        </button>
      </div>
    )
  }
}