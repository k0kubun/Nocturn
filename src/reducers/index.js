import { ADD_TWEET } from '../actions'
import { combineReducers } from 'redux';

const tweets = (state = [], action) => {
  switch (action.type) {
    case ADD_TWEET:
      return state;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  tweets,
});

export default rootReducer
