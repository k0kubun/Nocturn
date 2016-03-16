import Actions from '../actions';

const MAX_TWEETS_FOR_EACH_TAB = 100;

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

const removeFromSet = (set, tweet) => {
  for (let i in set) {
    if (set[i].id_str === tweet.id_str) {
      return [...set.slice(0, i), ...set.slice(i).slice(1)];
    }
  }
  return set;
}

export const tabsByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.tweets.ADD_TWEET:
      return {
        ...state,
        [action.account.id_str]: {
          ...(state[action.account.id_str] || {}),
          [action.tab]: sortedAdd(
            (state[action.account.id_str] && state[action.account.id_str][action.tab]) || [],
            action.tweet,
          ).slice(0, MAX_TWEETS_FOR_EACH_TAB),
        },
      };
    case Actions.tweets.REMOVE_TWEET:
      return {
        ...state,
        [action.account.id_str]: {
          ...(state[action.account.id_str] || {}),
          [action.tab]: removeFromSet(
            (state[action.account.id_str] && state[action.account.id_str][action.tab]) || [],
            action.tweet,
          ),
        },
      };
    case Actions.tweets.CLEAR_AND_SET_TWEETS:
      return {
        ...state,
        [action.account.id_str]: {
          ...(state[action.account.id_str] || {}),
          [action.tab]: action.tweets,
        },
      };
    default:
      return state;
  }
}
