import { connect } from 'react-redux';
import { addTweet } from '../actions';
import Timeline from '../components/Timeline';

const mapStateToProps = (state) => {
  return {
    tweets: state.tweets,
    activeAccountId: state.activeAccountId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTweetReceived: (tweet) => {
      dispatch(addTweet(tweet))
    },
  }
}

const StreamingTimeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);

export default StreamingTimeline
