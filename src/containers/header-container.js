import Actions       from '../actions';
import Header        from '../components/header';
import TimelineProxy from '../utils/timeline-proxy';
import TwitterClient from '../utils/twitter-client';
import { connect }   from 'react-redux';
import { shell }     from 'electron';

const mapStateToProps = (state) => {
  let activeAccount = state.accounts[state.activeAccountIndex];
  return {
    activeAccount: activeAccount,
    activeListId: activeAccount && state.activeListIdByUserId[activeAccount.id_str],
    activeSearchQuery: activeAccount && state.searchQueryByUserId[activeAccount.id_str],
  }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;

  const addTweet = (tweet, account, tab) => {
    dispatch(Actions.tweets.addTweet(tweet, account, tab));
  }

  const refreshListsTab = (client) => {
    if (stateProps.activeListId) {
      client.listsStatuses(stateProps.activeListId, (tweets) => {
        for (let tweet of tweets) {
          addTweet(tweet, stateProps.activeAccount, 'lists');
        }
      })
    }
  }

  const refreshSearchTab = (client) => {
    if (stateProps.activeSearchQuery) {
      client.searchTweets(stateProps.activeSearchQuery, (tweets) => {
        for (let tweet of tweets) {
          addTweet(tweet, stateProps.activeAccount, 'search');
        }
      })
    }
  }

  return {
    ...ownProps,
    ...stateProps,
    onHomeClicked: () => {
      let url = `https://twitter.com/${stateProps.activeAccount.screenName}`;
      shell.openExternal(url);
    },
    onRefreshClicked: () => {
      let client = new TwitterClient(stateProps.activeAccount);
      let proxy  = new TimelineProxy(addTweet, stateProps.activeAccount);

      client.homeTimeline((tweets) => {
        for (let tweet of tweets) {
          proxy.addTweet(tweet);
        }
      });
      refreshListsTab(client);
      refreshSearchTab(client);
    },
  }
}

export default connect(mapStateToProps, null, mergeProps)(Header);
