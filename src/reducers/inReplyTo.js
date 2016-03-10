import Actions from '../actions';

export const inReplyTo = (state = 0, action) => {
  switch (action.type) {
    case Actions.SET_IN_REPLY_TO:
      return action.tweet.id_str;
    case Actions.CLEAR_TEXT:
      return 0;
    default:
      return state;
  }
}
