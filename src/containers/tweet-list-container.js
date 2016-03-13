import { connect } from 'react-redux';
import TweetList   from '../components/tweet-list';

const mapStateToProps = (state, props) => {
  let selectedTab = state.selectedTabByUserId[props.account.id] || 'home';
  let tweetsByTab = state.tabsByUserId[props.account.id] || {};
  let activeTweetId = state.selectedTweetIdsByUserId[props.account.id] &&
    state.selectedTweetIdsByUserId[props.account.id][props.tab];

  return {
    active: selectedTab === props.tab,
    tweets: tweetsByTab[props.tab] || [],
    activeTweetId: activeTweetId,
  }
}

export default connect(mapStateToProps, {})(TweetList);
