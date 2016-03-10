import Actions from '../actions';

const MAX_TWEETS_FOR_EACH_TAB = 1000;

// Return set order by id DESC.
const sortedAdd = (set, tweet) => {
  for (let i in set) {
    let result = set[i].id_str.localeCompare(tweet.id_str);
    if (result == -1) {
      // If set[i].id_str is smaller than tweet.id_str, prepend tweet to set[i].
      return [...set.slice(0, i), tweet, ...set.slice(i)];
    } else if (result == 0) {
      // If tweet is already exist, replace it.
      return [...set.slice(0, i), tweet, ...set.slice(i).slice(1)];
    }
  }
  // Append tweet if all tweets in set is larger than a given tweet.
  return [...set, tweet];
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
            action.tweet,
          ).slice(0, MAX_TWEETS_FOR_EACH_TAB),
        },
      };
    case Actions.CLEAR_AND_SET_TWEETS:
      return {
        ...state,
        [action.account.id]: {
          ...(state[action.account.id] || {}),
          [action.tab]: action.tweets,
        },
      };
    default:
      return state;
  }
}
