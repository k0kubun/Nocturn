import JsonLoader from './JsonLoader';
import Twitter    from 'twitter';
import fs         from 'fs';
import path       from 'path';
import { CREDENTIALS_JSON } from './Authentication';

export default class TwitterClient {
  constructor(accessToken) {
    var credentials = JsonLoader.read(CREDENTIALS_JSON);

    this.client = Twitter({
      consumer_key:        credentials['consumerKey'],
      consumer_secret:     credentials['consumerSecret'],
      access_token_key:    accessToken['accessToken'],
      access_token_secret: accessToken['accessTokenSecret'],
    });
  }

  homeTimeline(callback) {
    return this.client.get('statuses/home_timeline', {}, (error, tweets, response) => {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return callback(tweets);
    });
  }

  mentionsTimeline(callback) {
    return this.client.get('statuses/mentions_timeline', {}, (error, tweets, response) => {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return callback(tweets);
    });
  }

  userStream(callback) {
    return this.client.stream('user', {}, (stream) => {
      stream.on('data', function(data) {
        if (data['friends']) {
          // noop
        } else if (data['event']) {
          // noop
        } else if (data['delete']) {
          // noop
        } else if (data['created_at']) {
          // This is a normal tweet
          return callback(data);
        }
      });

      return stream.on('error', (error) => {
        return console.log(JSON.stringify(error));
      });
    });
  }

  updateStatus(tweet, inReplyTo) {
    if (tweet === '') {
      return;
    }

    var params = { status: tweet };
    if (inReplyTo !== 0) {
      params['in_reply_to_status_id'] = inReplyTo;
    }
    return this.client.post('statuses/update', params, this.errorHandler);
  }

  favoriteStatus(tweetId, callback) {
    return this.client.post('favorites/create', { id: tweetId }, (error, data, response) => {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return callback();
    });
  }

  retweetStatus(tweetId) {
    return this.client.post(`statuses/retweet/${tweetId}`, {}, (error, data, response) => {
      if (error) {
        console.log(JSON.stringify(error));
      }
    });
  }

  deleteStatus(tweetId, callback) {
    return this.client.post(`statuses/destroy/${tweetId}`, {}, (error, data, response) => {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return callback();
    });
  }

  verifyCredentials(callback) {
    return this.client.get('account/verify_credentials', {}, (error, data, response) => {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return callback(data);
    });
  }

  listsList(callback) {
    return this.client.get('lists/list', {}, (error, data, response) => {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      return callback(data);
    });
  }

  listsStatuses(id, callback) {
    return this.client.get('lists/statuses', { list_id: id }, (error, tweets, response) => {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      for (let tweet of tweets.reverse()) {
        callback(tweet);
      }
    });
  }

  searchTweets(query, callback) {
    return this.client.get('search/tweets', { q: query }, (error, data, response) => {
      if (error) {
        return console.log(JSON.stringify(error));
      }

      for (let tweet of data['statuses'].reverse()) {
        callback(tweet);
      }
    });
  }

  errorHandler(error, data, response) {
    if (error) {
      console.log(JSON.stringify(error));
    }
  }
}
