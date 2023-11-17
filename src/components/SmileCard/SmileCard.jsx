import { Component } from 'react'
import PropTypes from 'prop-types'; // весь пакет prop-types

import './SmileCard.scss';

export default class SmileCard extends Component {
  handleClick = () => {
    const { onVote, id } = this.props;
    onVote(id);
  }

  render() {
    const { smile, title, description } = this.props;
    return (
      <div className='SmileCard' onClick={this.handleClick}>
        <div>{smile}</div>
        <div>
          <h3>{title}</h3>
          <div>{description}</div>
        </div>
      </div>
    )
  }
}

SmileCard.propTypes = {
  smile: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  onVote: PropTypes.func.isRequired, // propTypes для onVote и id
  id: PropTypes.number.isRequired,
};

SmileCard.defaultProps = {
  smile: 'SMILE',
  title: 'TITLE',
  description: 'DESCRIPTION',
}