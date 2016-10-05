import TwitterClient from '../utils/twitter-client';
import { addTweet, deleteTweetFromTab, addTweetToTab, removeTweet } from './tweets';

export const SET_OPEN_STREAM = 'SET_OPEN_STREAM';
export const SET_OPEN_FILTER = 'SET_OPEN_FILTER';
export const CLOSE_STREAM = 'CLOSE_STREAM';
export const CLOSE_FILTER = 'CLOSE_FILTER';

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
        } else {
          dispatch(addTweetToTab(event.target_object, account, 'favorites'))
        }
      });

      stream.on('unfavorite', (event) => {
        if (account.id_str === event.source.id_str) {
          dispatch(deleteTweetFromTab(event.target_object, account, 'favorites'))
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
