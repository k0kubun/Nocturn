export const ADD_TWEET = 'ADD_TWEET';

export const addTweet = (tweet, account, tab) => {
  return { type: ADD_TWEET, tweet, account, tab }
}
