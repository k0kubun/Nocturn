import React, { PropTypes } from 'react';
import Tweet                from '../containers/tweet';

export default class TweetList extends React.Component {
  static propTypes = {
    account:    PropTypes.object.isRequired,
    active:     PropTypes.bool.isRequired,
    tab:        PropTypes.string.isRequired,
    tweets:     PropTypes.array.isRequired,
    withHeader: PropTypes.bool,
  }

  render() {
    return(
      <ul id={this.props.id} className={`tweets ${this.props.withHeader ? 'with_header' : ''} ${this.props.active ? 'active' : ''}`}>
        {this.props.tweets.map((tweet) =>
          <Tweet
            key={tweet.id_str}
            tweet={tweet}
            tab={this.props.tab}
            account={this.props.account}
          />
        )}
      </ul>
    );
  }
}
