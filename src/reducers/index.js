import { ADD_TWEET, ADD_ACCOUNT } from '../actions'
import { combineReducers } from 'redux';

const tweets = (state = [], action) => {
  switch (action.type) {
    case ADD_TWEET:
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

const accountIndex = (state = 0, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  tweets,
  accounts,
  accountIndex,
});

export default rootReducer
