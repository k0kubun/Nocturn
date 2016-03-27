export const ADD_TWEET_TO_TAB = 'ADD_TWEET_TO_TAB';
export const CLEAR_AND_SET_TWEETS  = 'CLEAR_AND_SET_TWEETS';
export const FAVORITE_TWEET = 'FAVORITE_TWEET';
export const POST_TWEET = 'POST_TWEET';
export const REMOVE_TWEET = 'REMOVE_TWEET';
export const SELECT_TWEET = 'SELECT_TWEET';
export const SET_IN_REPLY_TO = 'SET_IN_REPLY_TO';
export const MARK_AS_READ = 'MARK_AS_READ';

export const addTweetToTab = (tweet, account, tab) => {
  return { type: ADD_TWEET_TO_TAB, tweet, account, tab }
}

export const clearAndSetTweets = (tweets, account, tab) => {
  return { type: CLEAR_AND_SET_TWEETS, tweets, account, tab }
}

export const postTweet = (text) => {
  return { type: POST_TWEET, text }
}

export const removeTweet = (tweet, account, tab) => {
  return { type: REMOVE_TWEET, tweet, account, tab }
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
