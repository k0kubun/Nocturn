jQuery = require('jquery')
TwitterClient = require('./twitter_client')

jQuery ($) ->
  # Follow window resize
  $(window).on('resize', ->
    frameHeight = $('.header').height() + $('.editor').height() + $('.tabs').height()
    $('.tweets').height($(window).height() - frameHeight)
  )

  twitterClient = new TwitterClient()
  twitterClient.homeTimeline (tweet) ->
    console.log(tweet.user.screen_name)
    console.log(tweet.text)
