import TwitterClient from '../utils/twitter-client';
import { addTweet, addTweetToTab, removeTweet } from './tweets';

export const SET_OPEN_FILTER = 'SET_OPEN_FILTER';
export const CLOSE_FILTER = 'CLOSE_FILTER';

export const setOpenFilter = (stream, account) => {
  return { type: SET_OPEN_FILTER, stream, account }
}

export const closeFilter = (account) => {
  return { type: CLOSE_FILTER, account }
}

export const startFilter = (query, account) => {
  return dispatch => {
    const client = new TwitterClient(account);
    client.filterStream(query, (stream) => {
      stream.on('data', (data) => {
        if (data['friends']) {
          // noop
        } else if (data['event']) {
          // noop
        } else if (data['delete']) {
          // noop
        } else if (data['created_at']) {
          // This is a normal tweet
          dispatch(addTweetToTab(data, account, 'search'));
        }
      });

      dispatch(setOpenFilter(stream, account));
    });
  }
}

export const reconnectFilter = (query, account) => {
  return (dispatch) => {
    dispatch(closeFilter(account));
    dispatch(startFilter(query, account));
  }
}
