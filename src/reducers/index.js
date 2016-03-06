import { combineReducers } from 'redux';
import {
  app,
  editor,
  timeline,
} from '../actions'

const accounts = (state = [], action) => {
  switch (action.type) {
    case app.ADD_ACCOUNT:
      return [...state, action.account];
    default:
      return state;
  }
}

const activeAccountIndex = (state = 0, action) => {
  switch (action.type) {
    case app.ACTIVATE_ACCOUNT:
      return action.account.index;
    default:
      return state;
  }
}

const text = (state = '', action) => {
  switch (action.type) {
    case editor.SET_TEXT:
      return action.text;
    case editor.CLEAR_TEXT:
      return '';
    default:
      return state;
  }
}

const tweets = (state = [], action) => {
  switch (action.type) {
    case timeline.ADD_TWEET:
      return [...state, action.tweet];
    default:
      return state;
  }
}

const userByUserId = (state = {}, action) => {
  switch (action.type) {
    case app.REFRESH_USER_INFO:
      state[action.user.id] = action.user;
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  accounts,
  activeAccountIndex,
  text,
  tweets,
  userByUserId,
});

export default rootReducer
