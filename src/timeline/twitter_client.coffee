fs      = require('fs')
path    = require('path')
Twitter = require('twitter')

module.exports =
class TwitterClient
  constructor: () ->
    credentials = this.readJson('credentials.json')
    accessToken = this.readJson('access_token.json')

    @client = Twitter({
      consumer_key:        credentials['consumer_key'],
      consumer_secret:     credentials['consumer_secret'],
      access_token_key:    accessToken['access_token_key'],
      access_token_secret: accessToken['access_token_secret'],
    })

  homeTimeline: (callback) ->
    @client.get('statuses/home_timeline', {}, (error, tweets, response) ->
      return if error

      for tweet in tweets.reverse()
        callback(tweet)
    )

  readJson: (jsonName) ->
    fullPath = path.resolve(__dirname, '..', '..', jsonName)
    return JSON.parse(fs.readFileSync(fullPath, 'utf-8'))
