export const ACTIVATE_ACCOUNT = 'ACTIVATE_ACCOUNT';
export const ADD_ACCOUNT = 'ADD_ACCOUNT';
export const REFRESH_USER_INFO = 'REFRESH_USER_INFO';

export const activateAccount = (index) => {
  return { type: ACTIVATE_ACCOUNT, index: parseInt(index) }
}

export const addAccount = (account) => {
  return { type: ADD_ACCOUNT, account }
}

export const refreshUserInfo = (user) => {
  return { type: REFRESH_USER_INFO, user }
}
