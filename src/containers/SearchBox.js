import React from 'react';
import TwitterClient from '../utils/TwitterClient'
import { connect } from 'react-redux';
import Actions from '../actions';
import * as Keycode  from '../utils/Keycode';

class SearchBox extends React.Component {
  isActive() {
    return this.props.selectedTabByUserId[this.props.account.id] === 'search';
  }

  onSearchFieldKeyDown(event) {
    if (event.keyCode === Keycode.ENTER) {
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
      <div className={`tweets_header search_box ${this.isActive() ? 'active' : ''}`}>
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

const mapStateToProps = (state) => {
  return {
    selectedTabByUserId: state.selectedTabByUserId,
  };
}

export default connect(mapStateToProps, Actions)(SearchBox);
