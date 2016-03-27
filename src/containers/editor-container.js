import * as Keycode  from '../utils/keycode';
import Actions       from '../actions';
import Editor        from '../components/editor';
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
    addTweet: (tweet, account) => {
      dispatch(Actions.addTweet(tweet, account));
    },
    clearText: () => {
      dispatch(Actions.clearText());
    },
    dispatch,
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

        const account = stateProps.activeAccount;
        const client  = new TwitterClient(account);
        client.updateStatus(stateProps.text, stateProps.inReplyTo, (tweet) => {
          dispatchProps.addTweet(tweet, account);
        });
        dispatchProps.clearText();
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Editor);
