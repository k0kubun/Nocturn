import React, { PropTypes } from 'react';

export default class Search extends React.Component {
  static propTypes = {
    account:              PropTypes.object.isRequired,
    active:               PropTypes.bool.isRequired,
    onSearchFieldKeyDown: PropTypes.func.isRequired,
  }

  render() {
    return(
      <div className={`tweets_header search_box ${this.props.active ? 'active' : ''}`}>
        <input
          className='search_field'
          type='text'
          placeholder='Twitter Search'
          onKeyDown={this.props.onSearchFieldKeyDown}
        />
      </div>
    );
  }
}
