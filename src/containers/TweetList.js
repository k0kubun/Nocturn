import React, { PropTypes } from 'react';
import Tweet                from './Tweet';
import { connect }          from 'react-redux';

class TweetList extends React.Component {
  static propTypes = {
    account:                  PropTypes.object.isRequired,
    selectedTab:              PropTypes.string.isRequired,
    selectedTweetIdsByUserId: PropTypes.object.isRequired,
    tab:                      PropTypes.string.isRequired,
    tweets:                   PropTypes.array.isRequired,
    withHeader:               PropTypes.bool,
  }

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
