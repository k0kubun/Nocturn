import React, { PropTypes } from 'react';
import Actions              from '../actions';
import BaseContainer        from '../containers/base-container';
import Favorite             from '../components/favorite';

export default class FavoriteContainer extends BaseContainer {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.tweet.favorited != nextProps.tweet.favorited;
  }

  onClick(event) {
    this.store.dispatch(
      Actions.favoriteTweet(
        this.props.tweet,
        this.props.account,
        this.props.tab,
      ),
    );
  }

  render() {
    return <Favorite {...this.props} onClick={this.onClick.bind(this)} />;
  }
}
