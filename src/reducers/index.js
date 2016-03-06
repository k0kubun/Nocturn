import { combineReducers } from 'redux';
import Actions from '../actions';

const accounts = (state = [], action) => {
  switch (action.type) {
    case Actions.ADD_ACCOUNT:
      return [...state, action.account];
    default:
      return state;
  }
}

const activeAccountIndex = (state = 0, action) => {
  switch (action.type) {
    case Actions.ACTIVATE_ACCOUNT:
      return action.index;
    default:
      return state;
  }
}

const selectedTabByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.SELECT_TAB:
      return {
        ...state,
        [action.account.id]: action.tab,
      };
    default:
      return state;
  }
}

const text = (state = '', action) => {
  switch (action.type) {
    case Actions.SET_TEXT:
      return action.text;
    case Actions.CLEAR_TEXT:
      return '';
    default:
      return state;
  }
}

const tweetsByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.ADD_TWEET:
      return {
        ...state,
        [action.account.id]: [...(state[action.account.id] || []), action.tweet],
      };
    default:
      return state;
  }
}

const userByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.REFRESH_USER_INFO:
      state[action.user.id] = action.user;
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  accounts,
  activeAccountIndex,
  selectedTabByUserId,
  text,
  tweetsByUserId,
  userByUserId,
});

export default rootReducer
