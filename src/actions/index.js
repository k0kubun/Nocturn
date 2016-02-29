export const ADD_TWEET =  'ADD_TWEET';
export const POST_TWEET = 'POST_TWEET';

export const addTweet = (tweet) => {
  return { type: ADD_TWEET, tweet }
}

export const postTweet = (text) => {
  return { type: POST_TWEET, text }
}
