import { ADD_TWEET, ADD_ACCOUNT, ACTIVATE_ACCOUNT } from '../actions'
import { combineReducers } from 'redux';

const tweetsByAccountId = (state = {}, action) => {
  switch (action.type) {
    case ADD_TWEET:
      if (!state[action.accountId]) { state[action.accountId] = [] }
      state[action.accountId] = [action.tweet, ...state[action.accountId]];
      return state;
    default:
      return state;
  }
}

const accounts = (state = [], action) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      return [...state, action.account];
    default:
      return state;
  }
}

const activeAccountId = (state = 0, action) => {
  switch (action.type) {
    case ACTIVATE_ACCOUNT:
      return action.account.userId;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  tweetsByAccountId,
  accounts,
  activeAccountId,
});

export default rootReducer
