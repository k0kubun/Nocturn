export const ADD_TWEET = 'ADD_TWEET';
export const CLEAR_AND_SET_TWEETS  = 'CLEAR_AND_SET_TWEETS';
export const FAVORITE_TWEET = 'FAVORITE_TWEET';
export const POST_TWEET = 'POST_TWEET';
export const SELECT_TWEET = 'SELECT_TWEET';
export const SET_IN_REPLY_TO = 'SET_IN_REPLY_TO';

export const addTweet = (tweet, account, tab) => {
  return { type: ADD_TWEET, tweet, account, tab }
}

export const clearAndSetTweets = (tweets, account, tab) => {
  return { type: CLEAR_AND_SET_TWEETS, tweets, account, tab }
}

export const postTweet = (text) => {
  return { type: POST_TWEET, text }
}

export const selectTweet = (tweet, tab, account) => {
  return { type: SELECT_TWEET, tweet, tab, account }
}

export const setInReplyTo = (tweet) => {
  return { type: SET_IN_REPLY_TO, tweet }
}
