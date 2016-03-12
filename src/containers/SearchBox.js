import React, { PropTypes } from 'react';
import * as Keycode         from '../utils/Keycode';
import Actions              from '../actions';
import TwitterClient        from '../utils/TwitterClient'
import { connect }          from 'react-redux';

class SearchBox extends React.Component {
  static propTypes = {
    account:           PropTypes.object.isRequired,
    active:            PropTypes.bool.isRequired,
    clearAndSetTweets: PropTypes.func.isRequired,
    setSearchQuery:    PropTypes.func.isRequired,
  }

  onSearchFieldKeyDown(event) {
    if (event.keyCode === Keycode.ENTER) {
      event.preventDefault();

      let query = event.target.value;
      let client = new TwitterClient(this.props.account);
      client.searchTweets(query, (tweets) => {
        this.props.setSearchQuery(query, this.props.account);
        this.props.clearAndSetTweets(tweets, this.props.account, 'search');
      });
    }
  }

  render() {
    return(
      <div className={`tweets_header search_box ${this.props.active ? 'active' : ''}`}>
        <input
          className='search_field'
          type='text'
          placeholder='Twitter Search'
          onKeyDown={this.onSearchFieldKeyDown.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    active: state.selectedTabByUserId[props.account.id] === 'search',
  };
}

export default connect(mapStateToProps, {
  ...Actions.tweets,
  ...Actions.texts,
})(SearchBox);
