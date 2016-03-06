import { combineReducers } from 'redux';
import {
  timeline,
  ADD_ACCOUNT,
  ACTIVATE_ACCOUNT,
  REFRESH_USER_INFO,
} from '../actions'

const tweets = (state = [], action) => {
  switch (action.type) {
    case timeline.ADD_TWEET:
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

const userByUserId = (state = {}, action) => {
  switch (action.type) {
    case REFRESH_USER_INFO:
      state[action.user.id] = action.user;
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  tweets,
  accounts,
  activeAccountId,
  userByUserId,
});

export default rootReducer
