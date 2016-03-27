import Actions       from '../actions';
import Timeline      from '../components/timeline';
import TwitterClient from '../utils/twitter-client';
import { connect }   from 'react-redux';

const mapStateToProps = (state, props) => {
  let activeAccount = state.accounts[state.activeAccountIndex] || {};
  return {
    active: activeAccount.id_str == props.account.id_str,
  };
}

const mapDispatchToProps = (dispatch, props) => {
  const client = new TwitterClient(props.account);

  return {
    loadHome: () => {
      client.homeTimeline({ count: 50 }, (tweets) => {
        for (let tweet of tweets) {
          dispatch(Actions.addTweet(tweet, props.account));
        }
      });
    },
    loadMentions: () => {
      client.mentionsTimeline((tweets) => {
        for (let tweet of tweets) {
          dispatch(Actions.addTweet(tweet, props.account));
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
            dispatch(Actions.addTweet(tweet, props.account, true));
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
