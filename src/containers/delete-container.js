import React, { PropTypes } from 'react';
import Actions              from '../actions';
import Delete               from '../components/delete';
import TwitterClient        from '../utils/twitter-client';

export default class DeleteContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }),
  }

  shouldComponentUpdate() {
    return false;
  }

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
  }

  onClick(event) {
    let client = new TwitterClient(this.props.account);
    client.deleteStatus(this.props.tweet.id_str, (tweet) => {
      this.store.dispatch(
        Actions.tweets.removeTweet(this.props.tweet, this.props.account, this.props.tab),
      );
    });
  }

  render() {
    return <Delete {...this.props} onClick={this.onClick.bind(this)} />;
  }
}
