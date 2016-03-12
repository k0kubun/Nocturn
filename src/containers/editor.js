import React, { PropTypes } from 'react';
import * as Keycode         from '../utils/keycode';
import Actions              from '../actions';
import ProfileImage         from './profile-image';
import TimelineProxy        from '../utils/timeline-proxy';
import TwitterClient        from '../utils/twitter-client';
import { connect }          from 'react-redux';

class Editor extends React.Component {
  static propTypes = {
    activeAccount: PropTypes.object,
    text:          PropTypes.string.isRequired,
    inReplyTo:     PropTypes.string,
    addTweet:      PropTypes.func.isRequired,
    clearText:     PropTypes.func.isRequired,
  }

  onTextareaChanged(event) {
    this.props.setText(event.target.value);
  }

  onTextareaKeyDown(event) {
    if (event.keyCode === Keycode.ENTER && !event.altKey) {
      event.preventDefault();

      let client = new TwitterClient(this.props.activeAccount);
      let proxy  = new TimelineProxy(this.props.addTweet, this.props.activeAccount);
      client.updateStatus(this.props.text, this.props.inReplyTo, (tweet) => {
        proxy.addTweet(tweet);
      });
      this.props.clearText();
    }
  }

  render() {
    return(
      <div className='editor'>
        <ProfileImage />
        <form action='#' method='post'>
          <textarea
            id='tweet_editor'
            className='tweet_editor'
            name='tweet'
            tabIndex='1'
            onChange={this.onTextareaChanged.bind(this)}
            onKeyDown={this.onTextareaKeyDown.bind(this)}
            value={this.props.text}
          />
          <div className='in_reply_to' id='0' />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeAccount: state.accounts[state.activeAccountIndex],
    text:          state.text,
    inReplyTo:     state.inReplyTo,
  }
}

export default connect(mapStateToProps, {
  ...Actions.tweets,
  ...Actions.texts,
})(Editor);
