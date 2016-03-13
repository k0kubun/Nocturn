import Actions     from '../actions';
import Tweet       from '../components/tweet';
import { connect } from 'react-redux';

const mapStateToProps = (state, props) => {
  let activeTweetId = state.selectedTweetIdsByUserId[props.account.id] &&
    state.selectedTweetIdsByUserId[props.account.id][props.tab];
  return {
    active: activeTweetId === props.tweet.id_str,
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClick: (event) => {
      dispatch(Actions.tweets.selectTweet(props.tweet, props.tab, props.account));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tweet);
