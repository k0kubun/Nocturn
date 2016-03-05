import { ADD_TWEET, ADD_ACCOUNT, ACTIVATE_ACCOUNT } from '../actions'
import { combineReducers } from 'redux';

const tweets = (state = [], action) => {
  switch (action.type) {
    case ADD_TWEET:
      return [...state, action.tweet];
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
  tweets,
  accounts,
  activeAccountId,
});

export default rootReducer
