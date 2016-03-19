import React, { PropTypes } from 'react';
import Actions              from '../actions';
import BaseContainer        from '../containers/base-container';
import Reply                from '../components/reply';

export default class ReplyContainer extends BaseContainer {
  shouldComponentUpdate() {
    return false;
  }

  onClick(event) {
    this.store.dispatch(Actions.setText(`@${this.props.tweet.user.screen_name} `));
    this.store.dispatch(Actions.setInReplyTo(this.props.tweet));

    // FIXME: Use better way to focus
    event.target.ownerDocument.getElementById('tweet_editor').focus();
  }

  render() {
    return <Reply {...this.props} onClick={this.onClick.bind(this)} />;
  }
}
