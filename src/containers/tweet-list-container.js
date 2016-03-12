import { connect } from 'react-redux';
import TweetList   from '../components/tweet-list';

const mapStateToProps = (state, props) => {
  let selectedTab = state.selectedTabByUserId[props.account.id] || 'home';
  let tweetsByTab = state.tabsByUserId[props.account.id] || {};
  return {
    active: selectedTab === props.tab,
    tweets: tweetsByTab[props.tab] || [],
  }
}

export default connect(mapStateToProps, {})(TweetList);
