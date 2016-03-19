import Actions       from '../actions';
import Timeline      from '../components/timeline';
import TimelineProxy from '../utils/timeline-proxy';
import TwitterClient from '../utils/twitter-client';
import { connect }   from 'react-redux';

const mapStateToProps = (state, props) => {
  let activeAccount = state.accounts[state.activeAccountIndex] || {};
  return {
    active: activeAccount.id_str == props.account.id_str,
  };
}

const mapDispatchToProps = (dispatch, props) => {
  const addTweet = (tweet, account, tab) => {
    dispatch(Actions.addTweet(tweet, account, tab));
  }

  const proxy  = new TimelineProxy(addTweet, props.account);
  const client = new TwitterClient(props.account);

  return {
    loadHome: () => {
      client.homeTimeline((tweets) => {
        for (let tweet of tweets) {
          proxy.addTweet(tweet, props.account, 'home');
        }
      }, { count: 50 });
    },
    loadMentions: () => {
      client.mentionsTimeline((tweets) => {
        for (let tweet of tweets) {
          proxy.addTweet(tweet, props.account, 'mentions');
        }
      })
    },
    loadLists: () => {
      client.listsList((lists) => {
        for (let list of lists) {
          dispatch(Actions.setLists(lists, props.account));
        }
      });
    },
    startStreaming: () => {
      client.userStream((tweet) => {
        proxy.addTweet(tweet, props.account, 'home');
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
