import * as Keycode  from '../utils/keycode';
import Actions       from '../actions';
import Editor        from '../components/editor';
import TimelineProxy from '../utils/timeline-proxy';
import TwitterClient from '../utils/twitter-client';
import { connect }   from 'react-redux';

const mapStateToProps = (state) => {
  return {
    active:        state.editorFocused,
    activeAccount: state.accounts[state.activeAccountIndex],
    text:          state.text,
    inReplyTo:     state.inReplyTo,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addTweetToTab: (tweet, account, tab) => {
      dispatch(Actions.addTweetToTab(tweet, account, tab));
    },
    clearText: () => {
      dispatch(Actions.clearText());
    },
    onTextareaChanged: (event) => {
      dispatch(Actions.setText(event.target.value));
    },
    onFocus: () => {
      dispatch(Actions.focusEditor());
    },
    onBlur: () => {
      dispatch(Actions.blurEditor());
    }
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onTextareaKeyDown: (event) => {
      if (event.keyCode === Keycode.ENTER && !event.altKey && !event.shiftKey) {
        event.preventDefault();

        let client = new TwitterClient(stateProps.activeAccount);
        let proxy = new TimelineProxy(dispatchProps.addTweetToTab, stateProps.activeAccount);
        client.updateStatus(stateProps.text, stateProps.inReplyTo, (tweet) => {
          proxy.addTweet(tweet);
        });
        dispatchProps.clearText();
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Editor);
