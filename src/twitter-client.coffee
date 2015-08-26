fs         = require('fs')
path       = require('path')
JsonLoader = require('./json-loader')
Twitter    = require('twitter')

module.exports =
class TwitterClient
  constructor: ->
    credentials = JsonLoader.read('credentials.json')
    accessToken = JsonLoader.read('access_token.json')

    @client = Twitter({
      consumer_key:        credentials['consumerKey'],
      consumer_secret:     credentials['consumerSecret'],
      access_token_key:    accessToken['accessToken'],
      access_token_secret: accessToken['accessTokenSecret'],
    })

  homeTimeline: (callback) ->
    @client.get('statuses/home_timeline', {}, (error, tweets, response) ->
      return console.log(JSON.stringify(error)) if error

      for tweet in tweets.reverse()
        callback(tweet)
    )

  mentionsTimeline: (callback) ->
    @client.get('statuses/mentions_timeline', {}, (error, tweets, response) ->
      return console.log(JSON.stringify(error)) if error

      callback(tweets)
    )

  userStream: (callback) ->
    @client.stream('user', {}, (stream) ->
      stream.on('data', (data) ->
        if data['friends']
          # noop
        else if data['event']
          # noop
        else if data['delete']
          # noop
        else if data['created_at']
          # This is a normal tweet
          callback(data)
      )

      stream.on('error', (error) ->
        console.log(JSON.stringify(error))
      )
    )

  updateStatus: (tweet, inReplyTo) ->
    return if tweet == ''

    params = { status: tweet }
    if inReplyTo != 0
      params['in_reply_to_status_id'] = inReplyTo
    @client.post('statuses/update', params, this.errorHandler)

  favoriteStatus: (tweetId, callback) ->
    @client.post('favorites/create', { id: tweetId }, (error, data, response) ->
      return console.log(JSON.stringify(error)) if error
      callback()
    )

  deleteStatus: (tweetId, callback) ->
    path = 'statuses/destroy/' + tweetId.toString()
    @client.post(path, {}, (error, data, response) ->
      return console.log(JSON.stringify(error)) if error
      callback()
    )

  verifyCredentials: (callback) ->
    @client.get('account/verify_credentials', {}, (error, data, response) ->
      return console.log(JSON.stringify(error)) if error
      callback(data)
    )

  listsList: (callback) ->
    @client.get('lists/list', {}, (error, data, response) ->
      return console.log(JSON.stringify(error)) if error
      callback(data)
    )

  listsStatuses: (id, callback) ->
    @client.get('lists/statuses', { list_id: id }, (error, tweets, response) ->
      return console.log(JSON.stringify(error)) if error
      for tweet in tweets.reverse()
        callback(tweet)
    )

  searchTweets: (query, callback) ->
    @client.get('search/tweets', { q: query }, (error, data, response) ->
      return console.log(JSON.stringify(error)) if error
      for tweet in data['statuses'].reverse()
        callback(tweet)
    )

  errorHandler: (error, data, response) ->
    console.log(JSON.stringify(error)) if error
