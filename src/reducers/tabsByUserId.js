import Actions from '../actions';
import SortedSet from 'js-sorted-set';

export const tabsByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.ADD_TWEET:
      return {
        ...state,
        [action.account.id]: {
          ...(state[action.account.id] || {}),
          [action.tab]: (
            (
              (state[action.account.id] && state[action.account.id][action.tab]) ||
              new SortedSet({ comparator: (a, b) => { return b.id_str.localeCompare(a.id_str) } })
            ).insert(action.tweet)
          ),
        }
      };
    default:
      return state;
  }
}
