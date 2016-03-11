import Actions from '../actions';

export const selectedTweetIdsByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.SELECT_TWEET:
      return {
        ...state,
        [action.account.id]: {
          ...(state[action.account.id] || {}),
          [action.tab]: action.tweet.id_str,
        },
      };
    default:
      return state;
  }
}
