import Twitter        from 'twitter';
import fs             from 'fs';
import path           from 'path';
import Authentication from './authentication';

export default class TwitterClient {
  // For throttling over 20 mentions per minute to avoid application BAN.
  static countMentions(count) {
    if (!this.mentionsCount && this.mentionsCount != 0) {
      this.mentionsCount = 0;
    }

    var date = new Date();
    if (!this.mentionsCountExpiredAt) {
      this.mentionsCountExpiredAt = date.getTime() + 5 * 60 * 1000; // 1min
    }
    if (this.mentionsCountExpiredAt < date.getTime()) {
      this.mentionsCount = 0;
      this.mentionsCountExpiredAt = date.getTime() + 5 * 60 * 1000; // 1min
    }

    return this.mentionsCount += count;
  }

  constructor(account) {
    var credentials = Authentication.credentials();

    this.client = Twitter({
      consumer_key:        account['consumerKey'] || credentials['consumerKey'],
      consumer_secret:     account['consumerSecret'] || credentials['consumerSecret'],
      access_token_key:    account['accessToken'],
      access_token_secret: account['accessTokenSecret'],
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

  favoritesList(params, callback) {
    this.client.get('favorites/list', params, (error, tweets, response) => {
      if (error) {
        console.log(JSON.stringify(error));
        return;
      }
      callback(tweets);
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

    // Throttling over 20 mentions per minute to avoid application BAN.
    const count = (tweet.match(/@/g) || []).length;
    if (count > 0) {
      const totalCount = TwitterClient.countMentions(count);
      if (totalCount > count && count > 20) {
        alert(`Failed to tweet!
Nocturn prohibits over 20 mentions per minute.`);
        return;
      }
    }

    this.client.post('statuses/update', params, (error, data, response) => {
      if (data.error) {
        TwitterClient.handleError('tweet', data.error);
        return;
      }
      if (data.errors) {
        TwitterClient.handleError('tweet', data.errors);
        return;
      }
      callback(data);
    });
  }

  favoriteStatus(tweetId, callback) {
    this.client.post('favorites/create', { id: tweetId }, (error, data, response) => {
      if (data.error) {
        TwitterClient.handleError('favorite', data.error);
        return;
      }
      callback(data);
    });
  }

  unfavoriteStatus(tweetId, callback) {
    this.client.post('favorites/destroy', { id: tweetId }, (error, data, response) => {
      if (data.error) {
        TwitterClient.handleError('unfavorite', data.error);
        return;
      }
      callback(data);
    });
  }

  retweetStatus(tweetId, callback) {
    this.client.post(`statuses/retweet/${tweetId}`, {}, (error, data, response) => {
      if (data.error) {
        TwitterClient.handleError('retweet', data.error);
        return;
      }
      callback(data);
    });
  }

  deleteStatus(tweetId, callback) {
    this.client.post(`statuses/destroy/${tweetId}`, {}, (error, data, response) => {
      if (data.error) {
        TwitterClient.handleError('delete', data.error);
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

  static handleError(action, error) {
    alert(`Failed to ${action}!
Error: ${JSON.stringify(error)}`);
  }
}
