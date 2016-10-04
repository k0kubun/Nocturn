import Actions     from '../actions';
import TweetTab    from '../components/tweet-tab';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  const selectedTab = state.selectedTabByUserId[props.account.id_str] || 'home';
  const tweetsByTab = state.tabsByUserId[props.account.id_str] || {};
  const tweets = tweetsByTab[props.tab] || [];

  return {
    active: selectedTab === props.tab,
    tweets: tweets,
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
      dispatch(Actions.selectTab(ownProps.tab, ownProps.account));
    }
  };
}

export default connect(mapStateToProps, null, mergeProps)(TweetTab)
