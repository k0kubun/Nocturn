import Actions       from '../actions';
import Favorite      from '../components/favorite';
import TwitterClient from '../utils/twitter-client';
import { connect }   from 'react-redux';

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onClick: (event) => {
      let client = new TwitterClient(props.account);
      client.favoriteStatus(props.tweet.id_str, (tweet) => {
        dispatch(Actions.tweets.addTweet(tweet, props.account, props.tab));
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
