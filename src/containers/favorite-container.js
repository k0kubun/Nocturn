import React, { PropTypes } from 'react';
import Actions              from '../actions';
import BaseContainer        from '../containers/base-container';
import Favorite             from '../components/favorite';
import TwitterClient        from '../utils/twitter-client';

export default class FavoriteContainer extends BaseContainer {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.tweet.favorited != nextProps.tweet.favorited;
  }

  onClick(event) {
    let client = new TwitterClient(this.props.account);
    client.favoriteStatus(this.props.tweet.id_str, (tweet) => {
      this.store.dispatch(Actions.tweets.addTweet(tweet, this.props.account, this.props.tab));
    });
  }

  render() {
    return <Favorite {...this.props} onClick={this.onClick.bind(this)} />;
  }
}
