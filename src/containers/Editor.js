import React from 'react';
import TwitterClient from '../utils/TwitterClient'
import * as Keycode from '../utils/Keycode';
import * as Actions from '../actions';
import { connect }   from 'react-redux';

export default class Editor extends React.Component {
  onTextareaChanged(event) {
    this.props.setText(event.target.value);
  }

  onTextareaKeyDown(event) {
    if (event.keyCode === Keycode.ENTER && !event.altKey) {
      event.preventDefault();
      // let client = new TwitterClient(this.props.account);
      // client.updateStatus(this.props.text, 0); // TODO: in-reply-to
      this.props.clearText();
    }
  }

  render() {
    return(
      <div className='editor'>
        <div className='account_wrapper'>
          <img className='twitter_icon' src={this.props.user ? this.props.user.profile_image_url : ''} />
        </div>
        <form action='#' method='post'>
          <textarea
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
    text: state.text,
  }
}

export default connect(mapStateToProps, Actions.editor)(Editor);
