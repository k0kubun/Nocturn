import Actions     from '../actions';
import TweetTab    from '../components/tweet-tab';
import { connect } from 'react-redux';

const countUnread = (tweets, readId) => {
  if (!readId) return 0;
  for (let i = 0; i < tweets.length; i++) {
    if (tweets[i].id_str.localeCompare(readId) <= 0) {
      return i;
    }
  }
  return 0;
}

const mapStateToProps = (state, props) => {
  let selectedTab = state.selectedTabByUserId[props.account.id_str] || 'home';
  let tweetsByTab = state.tabsByUserId[props.account.id_str] || {};
  let tweets = tweetsByTab[props.tab] || [];
  return {
    active: selectedTab === props.tab,
    tweets: tweets,
    unread: countUnread(tweets, state.readByUserId[props.account.id_str]),
  };
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { active, unread } = stateProps;
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    active,
    unread,
    onTabClicked: () => {
      dispatch(Actions.selectTab(ownProps.tab, ownProps.account));
      if (stateProps.tweets[0]) {
        dispatch(Actions.markAsRead(stateProps.tweets[0], ownProps.account));
      }
    },
  }
}

export default connect(mapStateToProps, null, mergeProps)(TweetTab);
