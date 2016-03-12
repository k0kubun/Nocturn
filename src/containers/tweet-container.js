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

export default connect(mapStateToProps, {
  ...Actions.tweets,
})(Tweet);
