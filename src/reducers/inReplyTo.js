import Actions from '../actions';

export const inReplyTo = (state = null, action) => {
  switch (action.type) {
    case Actions.SET_IN_REPLY_TO:
      return action.tweet.id_str;
    case Actions.CLEAR_TEXT:
      return null;
    default:
      return state;
  }
}
