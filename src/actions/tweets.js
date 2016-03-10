export const ADD_TWEET = 'ADD_TWEET';
export const CLEAR_AND_SET_TWEETS  = 'CLEAR_AND_SET_TWEETS';
export const POST_TWEET = 'POST_TWEET';

export const addTweet = (tweet, account, tab) => {
  return { type: ADD_TWEET, tweet, account, tab }
}

export const clearAndSetTweets = (tweets, account, tab) => {
  return { type: CLEAR_AND_SET_TWEETS, tweets, account, tab }
}

export const postTweet = (text) => {
  return { type: POST_TWEET, text }
}
