import React, { PropTypes } from 'react';
import Actions              from '../actions';
import BaseContainer        from '../containers/base-container';
import Tweet                from '../components/tweet';
import Retweet              from '../components/retweet';

export default class TweetContainer extends BaseContainer {
  shouldComponentUpdate(nextProps, nextState) {
    return (this.props.tweet.favorited != nextProps.tweet.favorited) ||
      ((this.props.activeTweetId === this.props.tweet.id_str) != (nextProps.activeTweetId === nextProps.tweet.id_str)) ||
      this.props.now != nextProps.now;
  }

  onClick(event) {
    this.store.dispatch(Actions.selectTweet(this.props.tweet, this.props.tab, this.props.account));
  }

  render() {
    if (this.props.tweet.retweeted_status) {
      return(
        <Retweet
          account={this.props.account}
          active={this.props.activeTweetId === this.props.tweet.id_str}
          tab={this.props.tab}
          tweet={this.props.tweet}
          onClick={this.onClick.bind(this)}
          now={this.props.now}
        />
      );
    } else {
      return(
        <Tweet
          account={this.props.account}
          active={this.props.activeTweetId === this.props.tweet.id_str}
          tab={this.props.tab}
          tweet={this.props.tweet}
          onClick={this.onClick.bind(this)}
          now={this.props.now}
        />
      );
    }
  }
}
