fs      = require('fs')
path    = require('path')
jQuery  = require('jquery')
Twitter = require('twitter')

jQuery ($) ->
  # Follow window resize
  $(window).on('resize', ->
    frameHeight = $('.header').height() + $('.editor').height() + $('.tabs').height()
    $('.tweets').height($(window).height() - frameHeight)
  )

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
  client = Twitter({
    consumer_key:        consumer['consumer_key'],
    consumer_secret:     consumer['consumer_secret'],
    access_token_key:    credentials['access_token_key'],
    access_token_secret: credentials['access_token_secret'],
  })
  client.get('statuses/home_timeline', {}, (error, tweets, response) ->
    return if error

    for tweet in tweets
      console.log(tweet.user.screen_name)
      console.log(tweet.text)
  )
