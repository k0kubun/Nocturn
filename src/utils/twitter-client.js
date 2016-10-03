import Twitter        from 'twitter';
import fs             from 'fs';
import path           from 'path';
import Authentication from './authentication';

export default class TwitterClient {
  constructor(accessToken) {
    var credentials = Authentication.credentials();

    this.client = Twitter({
      consumer_key:        credentials['consumerKey'],
      consumer_secret:     credentials['consumerSecret'],
      access_token_key:    accessToken['accessToken'],
      access_token_secret: accessToken['accessTokenSecret'],
    });
  }

  homeTimeline(params, callback) {
    this.client.get('statuses/home_timeline', params, (error, tweets, response) => {
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }
      callback(tweets);
    });
  }

  mentionsTimeline(params, callback) {
    this.client.get('statuses/mentions_timeline', params, (error, tweets, response) => {
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }
      callback(tweets);
    });
  }

  userStream(callback) {
    this.client.stream('user', {}, (stream) => {
      callback(stream);

      stream.on('error', (error) => {
        // ignoring because of too many errors
        // return console.log(JSON.stringify(error));
      });
    });
  }

  filterStream(track, callback) {
    this.client.stream('statuses/filter', { track: track }, (stream) => {
      callback(stream);
    });
  }

  updateStatus(tweet, inReplyTo, callback) {
    if (tweet === '') return;

    var params = { status: tweet };
    if (inReplyTo !== null) params['in_reply_to_status_id'] = inReplyTo;

    this.client.post('statuses/update', params, (error, data, response) => {
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }
      callback(data);
    });
  }

  favoriteStatus(tweetId, callback) {
    this.client.post('favorites/create', { id: tweetId }, (error, data, response) => {
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }
      callback(data);
    });
  }

  unfavoriteStatus(tweetId, callback) {
    this.client.post('favorites/destroy', { id: tweetId }, (error, data, response) => {
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }
      callback(data);
    });
  }

  retweetStatus(tweetId, callback) {
    this.client.post(`statuses/retweet/${tweetId}`, {}, (error, data, response) => {
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }
      callback(data);
    });
  }

  deleteStatus(tweetId, callback) {
    this.client.post(`statuses/destroy/${tweetId}`, {}, (error, data, response) => {
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }
      callback(data);
    });
  }

  verifyCredentials(callback) {
    this.client.get('account/verify_credentials', {}, (error, data, response) => {
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }
      callback(data);
    });
  }

  listsList(callback) {
    this.client.get('lists/list', {}, (error, data, response) => {
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }
      callback(data);
    });
  }

  listsStatuses(id, count, callback) {
    this.client.get('lists/statuses', { list_id: id, count: count }, (error, tweets, response) => {
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }
      callback(tweets);
    });
  }

  searchTweets(query, count, callback) {
    if (query === '') return;

    this.client.get('search/tweets', { q: query, count: count }, (error, data, response) => {
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }
      callback(data['statuses']);
    });
  }
}
