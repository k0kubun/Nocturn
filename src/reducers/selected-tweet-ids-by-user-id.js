import Actions from '../actions';

export const selectedTweetIdsByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.tweets.SELECT_TWEET:
      return {
        ...state,
        [action.account.id_str]: {
          ...(state[action.account.id_str] || {}),
          [action.tab]: action.tweet.id_str,
        },
      };
    default:
      return state;
  }
}
