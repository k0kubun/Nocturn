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
  const addTweetToTab = (tweet, account, tab) => {
    dispatch(Actions.addTweetToTab(tweet, account, tab));
  }

  const proxy  = new TimelineProxy(addTweetToTab, props.account);
  const client = new TwitterClient(props.account);

  return {
    loadHome: () => {
      client.homeTimeline({ count: 50 }, (tweets) => {
        for (let tweet of tweets) {
          proxy.addTweet(tweet);
        }
      });
    },
    loadMentions: () => {
      client.mentionsTimeline((tweets) => {
        for (let tweet of tweets) {
          proxy.addTweet(tweet);
        }
        dispatch(Actions.markAsRead(tweets[0], props.account));
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
      const proxy = new TimelineProxy(addTweetToTab, props.account, true);
      client.userStream((stream) => {
        stream.on('data', function(data) {
          if (data['friends']) {
            // noop
          } else if (data['event']) {
            // noop
          } else if (data['delete']) {
            // noop
          } else if (data['created_at']) {
            // This is a normal tweet
            proxy.addTweet(data);
          }
        });

        stream.on('favorite', (event) => {
          if (props.account.id_str !== event.source.id_str) {
            new Notification(
              `${event.source.screen_name} favorited:`,
              { body: `${event.target.screen_name} "${event.target_object.text}"` },
            );
          }
        });
      });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
