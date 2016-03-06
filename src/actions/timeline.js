export const ADD_TWEET  = 'ADD_TWEET';

export const addTweet = (tweet) => {
  return { type: ADD_TWEET, tweet }
}
