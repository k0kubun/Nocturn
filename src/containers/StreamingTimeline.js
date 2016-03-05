import { connect } from 'react-redux';
import { addTweet } from '../actions';
import Timeline from '../components/Timeline';
import TwitterClient from '../utils/TwitterClient'

const mapStateToProps = (state) => {
  return {
    activeAccountId: state.activeAccountId,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startStreaming: (account) => {
      let accountId = account.user_id;
      let client = new TwitterClient(account);
      client.userStream((tweet) => {
        dispatch(addTweet(tweet));
      });
    },
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
