import Actions from '../actions';

export const inReplyTo = (state = null, action) => {
  switch (action.type) {
    case Actions.tweets.SET_IN_REPLY_TO:
      return action.tweet.id_str;
    case Actions.texts.CLEAR_TEXT:
      return null;
    default:
      return state;
  }
}
