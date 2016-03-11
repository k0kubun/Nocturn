import React from 'react';
import Tweet from './Tweet'
import { connect } from 'react-redux';

class TweetList extends React.Component {
  isActive() {
    return this.props.selectedTab === this.props.tab;
  }

  render() {
    let activeTweetId = this.props.selectedTweetIdsByUserId[this.props.account.id] &&
      this.props.selectedTweetIdsByUserId[this.props.account.id][this.props.tab];

    return(
      <ul id={this.props.id} className={`tweets ${this.props.withHeader ? 'with_header' : ''} ${this.isActive() ? 'active' : ''}`}>
        {this.props.tweets.map((tweet) =>
          <Tweet
            key={tweet.id_str}
            tweet={tweet}
            tab={this.props.tab}
            account={this.props.account}
            active={activeTweetId == tweet.id_str}
          />
        )}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedTweetIdsByUserId: state.selectedTweetIdsByUserId,
  }
}

export default connect(mapStateToProps, {})(TweetList);
