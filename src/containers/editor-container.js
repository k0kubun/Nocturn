import * as Keycode  from '../utils/keycode';
import Actions       from '../actions';
import Editor        from '../components/editor';
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
  const { dispatch } = dispatchProps;
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onTextareaKeyDown: (event) => {
      if (event.keyCode === Keycode.ENTER && !event.altKey && !event.shiftKey) {
        event.preventDefault();
        dispatch(Actions.postTweet(stateProps.text, stateProps.activeAccount, stateProps.inReplyTo));
      }
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Editor);
