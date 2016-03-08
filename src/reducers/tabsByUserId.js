import Actions from '../actions';

// Return set order by id DESC.
const sortedAdd = (set, tweet) => {
  for (let i in set) {
    let result = set[i].id_str.localeCompare(tweet.id_str);
    if (result == -1) {
      // If set[i].id_str is smaller than tweet.id_str, prepend tweet to set[i].
      return [...set.slice(0, i), tweet, ...set.slice(i)];
    } else if (result == 0) {
      // If tweet is already exist, ignore it.
      return set;
    }
  }
  return [tweet, ...set];
};

export const tabsByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.ADD_TWEET:
      return {
        ...state,
        [action.account.id]: {
          ...(state[action.account.id] || {}),
          [action.tab]: sortedAdd(
            (state[action.account.id] && state[action.account.id][action.tab]) || [],
            action.tweet
          ),
        }
      };
    default:
      return state;
  }
}
