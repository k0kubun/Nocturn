import Actions     from '../actions';
import TweetTab    from '../components/tweet-tab';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  const selectedTab = state.selectedTabByUserId[props.account.id_str] || 'home';

  return {
    active: selectedTab === props.tab,
    unread: 0
  };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { active, unread } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    active,
    unread,
    onTabClicked() {
      // TODO call dispatch and execute data fetching
    }
  };
}

export default connect(mapStateToProps, null, mergeProps)(TweetTab)
