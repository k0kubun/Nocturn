export const POST_TWEET = 'POST_TWEET';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const ACTIVATE_ACCOUNT = 'ACTIVATE_ACCOUNT';
export const REFRESH_USER_INFO = 'REFRESH_USER_INFO';

export const postTweet = (text) => {
  return { type: POST_TWEET, text }
}

export const addAccount = (account) => {
  return { type: ADD_ACCOUNT, account }
}

export const activateAccount = (index) => {
  return { type: ACTIVATE_ACCOUNT, index }
}

export const refreshUserInfo = (user) => {
  return { type: REFRESH_USER_INFO, user }
}
