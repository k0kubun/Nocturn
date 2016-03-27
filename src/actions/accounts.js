import TwitterClient from '../utils/twitter-client';

export const ACTIVATE_ACCOUNT = 'ACTIVATE_ACCOUNT';
export const ADD_ACCOUNT_TO_LIST = 'ADD_ACCOUNT_TO_LIST';
export const REFRESH_USER_INFO = 'REFRESH_USER_INFO';

export const activateAccount = (index) => {
  return { type: ACTIVATE_ACCOUNT, index: parseInt(index) }
}

export const addAccountToList = (account) => {
  return { type: ADD_ACCOUNT_TO_LIST, account }
}

export const refreshUserInfo = (user) => {
  return { type: REFRESH_USER_INFO, user }
}

export const addAccount = (token) => {
  return dispatch => {
    dispatch(addAccountToList(token));

    const client = new TwitterClient(token);
    client.verifyCredentials((user) => {
      dispatch(refreshUserInfo(user));
    });
  }
}
