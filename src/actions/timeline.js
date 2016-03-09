export const ADD_TWEET = 'ADD_TWEET';
export const SET_LISTS = 'SET_LISTS';

export const addTweet = (tweet, account, tab) => {
  return { type: ADD_TWEET, tweet, account, tab }
}

export const setLists = (lists, account) => {
  return { type: SET_LISTS, lists, account }
}
