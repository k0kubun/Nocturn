import Actions     from '../actions';
import TweetTab    from '../components/tweet-tab';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  return {
    unread: 0
  };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { unread } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    unread,
    onTabClicked() {
      // TODO call dispatch and execute data fetching
    }
  };
}

export default connect(mapStateToProps, null, mergeProps)(TweetTab)
