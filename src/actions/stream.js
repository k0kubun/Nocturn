import TwitterClient from '../utils/twitter-client';
import { addTweet, removeTweet } from './tweets';

export const SET_OPEN_STREAM = 'SET_OPEN_STREAM';
export const CLOSE_STREAM = 'CLOSE_STREAM';

export const setOpenStream = (stream, account) => {
  return { type: SET_OPEN_STREAM, stream, account }
}

export const closeStream = (account) => {
  return { type: CLOSE_STREAM, account }
}

export const startStreaming = (account) => {
  return dispatch => {
    const client = new TwitterClient(account);
    client.userStream((stream) => {
      stream.on('data', (data) => {
        if (data['friends']) {
          // noop
        } else if (data['event']) {
          // noop
        } else if (data['delete']) {
          dispatch(removeTweet(data['delete']['status'], account));
        } else if (data['created_at']) {
          // This is a normal tweet
          dispatch(addTweet(data, account, true));
        }
      });

      stream.on('favorite', (event) => {
        if (account.id_str !== event.source.id_str) {
          new Notification(
            `${event.source.screen_name} favorited:`,
            { body: `${event.target.screen_name} "${event.target_object.text}"` },
          );
        }
      });

      dispatch(setOpenStream(stream, account));
    });
  }
}

export const reconnectStreaming = (account) => {
  return (dispatch) => {
    dispatch(closeStream(account));
    dispatch(startStreaming(account));
  }
}
