import TwitterClient from '../utils/twitter-client';
import { addTweet } from './tweets';

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
          // noop
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
    });
  }
}
