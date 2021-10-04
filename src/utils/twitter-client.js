import TwitterApi     from 'twitter-api-v2';
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

    this.client = new TwitterApi({
      appKey:              account['consumerKey'] || credentials['consumerKey'],
      appSecret:           account['conumerSecret' ] || credentials['consumerSecret'],
      accessToken:         account['accessToken'],
      accessSecret:        account['accessTokenSecret'],
    });
  }

  homeTimeline(params, callback) {
    this.client.v1.homeTimeline(this.extendParams(params))
      .then(tweets => callback(tweets))
      .catch(error => console.log(JSON.stringify(error)));
  }

  mentionsTimeline(params, callback) {
    this.client.v1.mentionTimeline(this.extendParams(params))
      .then(tweets => callback(tweets))
      .catch(error => console.log(JSON.stringify(error)));
  }

  favoritesList(params, callback) {
    this.client.v1.get('favorites/list.json', this.extendParams(params))
      .then(tweets => callback(tweets))
      .catch(error => console.log(JSON.stringify(error)));
  }

  filterStream(track, callback) {
    this.client.v1.filterStream(this.extendParams({ track: track }))
      .then(stream => callback(stream));
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

    this.client.v1.post('statuses/update.json', this.extendParams(params))
      .then(data => {
        callback(data);
        if (data.error) {
          throw new Error(data.error);
        } else if (data.errors) {
          throw new Error(data.errors);
        }
      })
      .catch(error => TwitterClient.handleError('tweet', error));
  }

  favoriteStatus(tweetId, callback) {
    this.client.v1.post('favorites/create.json', this.extendParams({ id: tweetId }))
      .then(data => { 
        callback(data);
        if (data.error) {
          throw new Error(data.error);
        }
      })
      .catch(error => TwitterClient.handleError('favorite', error));
  }

  unfavoriteStatus(tweetId, callback) {
    this.client.v1.post('favorites/destroy.json', this.extendParams({ id: tweetId }))
      .then(data => {
        callback(data);
        if (data.error) {
          throw new Error(data.error);
        }
      })
      .catch(error => TwitterClient.handleError('unfavorite', error));
  }

  retweetStatus(tweetId, callback) {
    this.client.v1.post(`statuses/retweet/${tweetId}`, this.extendParams({ id: tweetId }))
      .then(data => { 
        callback(data);
        if (data.error) {
          throw new Error(data.error);
        }
      })
      .catch(error => TwitterClient.handleError('retweet', error));
  }

  deleteStatus(tweetId, callback) {
    this.client.v1.post(`statuses/destroy/${tweetId}`, this.extendParams({ id: tweetId }))
      .then(data => { 
        callback(data);
        if (data.error) {
          throw new Error(data.error);
        }
      })
      .catch(error => TwitterClient.handleError('delete', error));
  }

  verifyCredentials(callback) {
    this.client.v1.verifyCredentials(this.extendParams({}))
      .then(data => callback(data))
      .catch(error => console.log(JSON.stringify(error)));
  }

  listsList(callback) {
    this.client.v1.lists(this.extendParams({}))
      .then(data => callback(data))
      .catch(error => console.log(JSON.stringify(error)));
  }

  listStatuses(id, count, callback) {
    this.client.v1.listStatuses(this.extendParams({ list_id: id, count: count }))
      .then(tweets => callback(tweets))
      .catch(error => console.log(JSON.stringify(error)));
  }

  listStatusesBySlug(owner, slug, count, callback) {
    this.client.v1.listStatuses(this.extendParams({ owner_screen_name: owner, slug: slug, count: count }))
      .then(tweets => callback(tweets))
      .catch(error => console.log(JSON.stringify(error)));
  }

  searchTweets(query, count, callback) {
    if (query === '') return;

    this.client.v1.get('search/tweets.json', this.extendParams({ q: query, count: count }))
      .then(data => callback(data['statuses']))
      .catch(error => console.log(JSON.stringify(error)));
  }

  // https://developer.twitter.com/en/docs/tweets/tweet-updates
  extendParams(params) {
    return Object.assign({}, params, { tweet_mode: 'extended' });
  }

  static handleError(action, error) {
    alert(`Failed to ${action}!
      Error: ${JSON.stringify(error)}`);
  }
}
