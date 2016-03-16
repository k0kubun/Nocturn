import { connect } from 'react-redux';
import TweetList   from '../components/tweet-list';

const mapStateToProps = (state, props) => {
  let selectedTab = state.selectedTabByUserId[props.account.id_str] || 'home';
  let tweetsByTab = state.tabsByUserId[props.account.id_str] || {};
  let activeTweetId = state.selectedTweetIdsByUserId[props.account.id_str] &&
    state.selectedTweetIdsByUserId[props.account.id_str][props.tab];

  return {
    active: selectedTab === props.tab,
    tweets: tweetsByTab[props.tab] || [],
    activeTweetId: activeTweetId,
  }
}

export default connect(mapStateToProps, {})(TweetList);
