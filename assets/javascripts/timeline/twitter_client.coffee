fs      = require('fs')
path    = require('path')
Twitter = require('twitter')

module.exports =
class TwitterClient
  constructor: () ->
    # read consumer
    consumerPath   = path.resolve(__dirname, '..', '..', 'consumer.json')
    consumer       = JSON.parse(fs.readFileSync(consumerPath, 'utf-8'))
    consumerKey    = consumer['consumer_key']
    consumerSecret = consumer['consumer_secret']

    # read credential
    credentialsPath = path.resolve(__dirname, '..', '..', 'credentials.json')
    credentials     = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'))
    tokenKey        = credentials['access_token_key']
    tokenSecret     = credentials['access_token_secret']

    # initialize timeline
    @client = Twitter({
      consumer_key:        consumer['consumer_key'],
      consumer_secret:     consumer['consumer_secret'],
      access_token_key:    credentials['access_token_key'],
      access_token_secret: credentials['access_token_secret'],
    })

  homeTimeline: (callback) ->
    @client.get('statuses/home_timeline', {}, (error, tweets, response) ->
      return if error

      for tweet in tweets
        callback(tweet)
    )
