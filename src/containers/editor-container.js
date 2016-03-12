import Actions     from '../actions';
import { connect } from 'react-redux';
import Editor      from '../components/editor'

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
