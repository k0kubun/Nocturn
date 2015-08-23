fs      = require('fs')
path    = require('path')
Twitter = require('twitter')

module.exports =
class TwitterClient
  constructor: ->
    credentials = this.readJson('credentials.json')
    accessToken = this.readJson('access_token.json')

    @client = Twitter({
      consumer_key:        credentials['consumerKey'],
      consumer_secret:     credentials['consumerSecret'],
      access_token_key:    accessToken['accessToken'],
      access_token_secret: accessToken['accessTokenSecret'],
    })

  homeTimeline: (callback) ->
    @client.get('statuses/home_timeline', {}, (error, tweets, response) ->
      return if error

      for tweet in tweets.reverse()
        callback(tweet)
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

  errorHandler: (error, data, response) ->
    console.log(JSON.stringify(error)) if error

  readJson: (jsonName) ->
    fullPath = path.resolve(__dirname, '..', jsonName)
    return JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
