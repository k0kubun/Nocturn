import React, { PropTypes } from 'react';
import TwitterClient        from '../utils/TwitterClient'
import TimelineProxy        from '../utils/TimelineProxy'
import * as Keycode         from '../utils/Keycode';
import Actions              from '../actions';
import { connect }          from 'react-redux';

class Editor extends React.Component {
  static propTypes = {
    activeAccount: PropTypes.object,
    activeUser:    PropTypes.object,
    text:          PropTypes.string.isRequired,
    inReplyTo:     PropTypes.string,
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

  onTwitterIconClicked(event) {
    event.preventDefault();
    let document = event.target.ownerDocument;

    // Dirty hack to toggle select element
    let dropdown = document.getElementById('account_selector');
    let mouseEvent = document.createEvent('MouseEvents');
    mouseEvent.initMouseEvent('mousedown', true, true, window);
    dropdown.dispatchEvent(mouseEvent);
  }

  render() {
    return(
      <div className='editor'>
        <div className='account_wrapper'>
          <img
            className='twitter_icon'
            src={this.props.activeUser ? this.props.activeUser.profile_image_url : ''}
            onClick={this.onTwitterIconClicked.bind(this)}
          />
        </div>
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
  let activeAccount = state.accounts[state.activeAccountIndex];
  return {
    activeAccount: activeAccount,
    activeUser:    activeAccount && state.userByUserId[activeAccount.id],
    text:          state.text,
    inReplyTo:     state.inReplyTo,
  }
}

export default connect(mapStateToProps, Actions)(Editor);
