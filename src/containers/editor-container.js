import * as Keycode  from '../utils/keycode';
import Actions       from '../actions';
import Editor        from '../components/editor';
import TimelineProxy from '../utils/timeline-proxy';
import TwitterClient from '../utils/twitter-client';
import { connect }   from 'react-redux';

const mapStateToProps = (state) => {
  return {
    activeAccount: state.accounts[state.activeAccountIndex],
    text:          state.text,
    inReplyTo:     state.inReplyTo,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addTweet: (tweet, account, tab) => {
      dispatch(Actions.tweets.addTweet(tweet, account, tab));
    },
    clearText: () => {
      dispatch(Actions.texts.clearText());
    },
    onTextareaChanged: (event) => {
      dispatch(Actions.texts.setText(event.target.value));
    },
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { onTextareaChanged } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
    onTextareaChanged,
    onTextareaKeyDown: (event) => {
      if (event.keyCode === Keycode.ENTER && !event.altKey && !event.shiftKey) {
        event.preventDefault();

        let client = new TwitterClient(stateProps.activeAccount);
        let proxy = new TimelineProxy(dispatchProps.addTweet, stateProps.activeAccount);
        client.updateStatus(stateProps.text, stateProps.inReplyTo, (tweet) => {
          proxy.addTweet(tweet);
        });
        dispatchProps.clearText();
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Editor);
