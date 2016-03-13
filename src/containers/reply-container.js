import React, { PropTypes } from 'react';
import Actions              from '../actions';
import Reply                from '../components/reply';

export default class ReplyContainer extends React.Component {
  static contextTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
    }),
  }

  constructor(props, context) {
    super(props, context);
    this.store = context.store;
  }

  onClick(event) {
    this.store.dispatch(Actions.texts.setText(`@${this.props.tweet.user.screen_name} `));
    this.store.dispatch(Actions.tweets.setInReplyTo(this.props.tweet));

    // FIXME: Use better way to focus
    event.target.ownerDocument.getElementById('tweet_editor').focus();
  }

  render() {
    return <Reply {...this.props} onClick={this.onClick.bind(this)} />;
  }
}
