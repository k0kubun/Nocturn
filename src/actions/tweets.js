import TwitterClient from '../utils/twitter-client';
import { clearText, setSearchQuery } from './texts';

export const ADD_TWEET_TO_TAB = 'ADD_TWEET_TO_TAB';
export const CLEAR_AND_SET_TWEETS  = 'CLEAR_AND_SET_TWEETS';
export const FAVORITE_TWEET = 'FAVORITE_TWEET';
export const REMOVE_TWEET = 'REMOVE_TWEET';
export const SELECT_TWEET = 'SELECT_TWEET';
export const SET_IN_REPLY_TO = 'SET_IN_REPLY_TO';
export const MARK_AS_READ = 'MARK_AS_READ';

const notifyMention = (tweet, account) => {
  if (account.id_str !== tweet.user.id_str) {
    new Notification(
      `@${tweet.user.screen_name} - Reply from ${tweet.user.name}`,
      { body: tweet.text },
    );
  }
}

export const addTweetToTab = (tweet, account, tab) => {
  return { type: ADD_TWEET_TO_TAB, tweet, account, tab }
}

export const addTweet = (tweet, account, notify = false) => {
  return dispatch => {
    dispatch(addTweetToTab(tweet, account, 'home'));

    if (tweet.entities && tweet.entities.user_mentions) {
      for (let mention of tweet.entities.user_mentions) {
        if (mention.id_str == account.id_str) {
          dispatch(addTweetToTab(tweet, account, 'mentions'));
          if (notify) notifyMention(tweet, account);
        }
      }
    }
  }
}

export const clearAndSetTweets = (tweets, account, tab) => {
  return { type: CLEAR_AND_SET_TWEETS, tweets, account, tab }
}

export const favoriteTweet = (tweet, account, tab) => {
  return dispatch => {
    const client = new TwitterClient(account);
    const dispatchAddTweetToTab = (tweet) => {
      dispatch(addTweetToTab(tweet, account, tab));
    }

    if (tweet.favorited) {
      client.unfavoriteStatus(tweet.id_str, dispatchAddTweetToTab);
    } else {
      client.favoriteStatus(tweet.id_str, dispatchAddTweetToTab);
    }

    dispatchAddTweetToTab(Object.assign({}, tweet, {
      favorited: !tweet.favorited
    }));
  }
}

export const postTweet = (text, account, inReplyTo) => {
  return dispatch => {
    const client = new TwitterClient(account);
    client.updateStatus(text, inReplyTo, (tweet) => {
      dispatch(addTweet(tweet, account));
    });
    dispatch(clearText());
  }
}

export const deleteTweetFromTab = (tweet, account, tab) => {
  return { type: REMOVE_TWEET, tweet, account, tab }
}

export const removeTweet = (tweet, account) => {
  return dispatch => {
    dispatch(deleteTweetFromTab(tweet, account, 'home'));
    dispatch(deleteTweetFromTab(tweet, account, 'mentions'));
  }
}

export const deleteTweet = (tweet, account, tab) => {
  return dispatch => {
    const client = new TwitterClient(account);
    client.deleteStatus(tweet.id_str, (updatedTweet) => {
      dispatch(deleteTweetFromTab(updatedTweet, account, tab));
    });
  }
}

export const selectTweet = (tweet, tab, account) => {
  return { type: SELECT_TWEET, tweet, tab, account }
}

export const setInReplyTo = (tweet) => {
  return { type: SET_IN_REPLY_TO, tweet }
}

export const markAsRead = (tweet, account) => {
  return { type: MARK_AS_READ, tweet, account }
}

export const loadHome = (account) => {
  return dispatch => {
    const client = new TwitterClient(account);
    client.homeTimeline({ count: 50 }, (tweets) => {
      for (let tweet of tweets) {
        dispatch(addTweet(tweet, account));
      }
    });
  }
}

export const loadMentions = (account, ignore = false) => {
  return dispatch => {
    const client = new TwitterClient(account);
    client.mentionsTimeline({ count: 50 }, (tweets) => {
      for (let tweet of tweets) {
        dispatch(addTweet(tweet, account));
      }
      if (ignore) {
        dispatch(markAsRead(tweets[0], account));
      }
    });
  }
}

export const loadFavorites = (account) => {
  return dispatch => {
    const client = new TwitterClient(account);
    client.favoritesList({ count: 50 }, (tweets) => {
      for (let tweet of tweets) {
        dispatch(addTweet(tweet, account));
      }
    }
  });
}

export const loadList = (listId, account, reset = false) => {
  return dispatch => {
    const client = new TwitterClient(account);
    client.listsStatuses(listId, 50, (tweets) => {
      if (reset) {
        dispatch(clearAndSetTweets(tweets, account, 'lists'));
      } else {
        for (let tweet of tweets) {
          dispatch(addTweetToTab(tweet, account, 'lists'));
        }
      }
    });
  }
}

export const loadSearch = (query, account, reset = false) => {
  return dispatch => {
    const client = new TwitterClient(account);
    client.searchTweets(query, 50, (tweets) => {
      if (reset) {
        dispatch(clearAndSetTweets(tweets, account, 'search'));
      } else {
        for (let tweet of tweets) {
          dispatch(addTweetToTab(tweet, account, 'search'));
        }
      }
    });
  }
}
