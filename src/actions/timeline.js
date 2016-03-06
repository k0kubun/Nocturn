export const ADD_TWEET = 'ADD_TWEET';

export const addTweet = (tweet, account) => {
  return { type: ADD_TWEET, tweet, account }
}
