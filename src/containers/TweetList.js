import React, { PropTypes } from 'react';
import Tweet                from './Tweet';
import { connect }          from 'react-redux';

class TweetList extends React.Component {
  static propTypes = {
    account:                  PropTypes.object.isRequired,
    active:                   PropTypes.bool.isRequired,
    selectedTweetIdsByUserId: PropTypes.object.isRequired,
    tab:                      PropTypes.string.isRequired,
    tweets:                   PropTypes.array.isRequired,
    withHeader:               PropTypes.bool,
  }

  render() {
    let activeTweetId = this.props.selectedTweetIdsByUserId[this.props.account.id] &&
      this.props.selectedTweetIdsByUserId[this.props.account.id][this.props.tab];

    return(
      <ul id={this.props.id} className={`tweets ${this.props.withHeader ? 'with_header' : ''} ${this.props.active ? 'active' : ''}`}>
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

const mapStateToProps = (state, props) => {
  let selectedTab = state.selectedTabByUserId[props.account.id] || 'home';
  return {
    active: selectedTab === props.tab,
    selectedTweetIdsByUserId: state.selectedTweetIdsByUserId,
  }
}

export default connect(mapStateToProps, {})(TweetList);
