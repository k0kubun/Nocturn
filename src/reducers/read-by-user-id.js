import Actions from '../actions';

export const readByUserId = (state = {}, action) => {
  switch (action.type) {
    case Actions.MARK_AS_READ:
      return {
        ...state,
        [action.account.id_str]: action.tweet.id_str,
      };
    default:
      return state;
  }
}
