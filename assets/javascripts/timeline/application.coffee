jQuery = require('jquery')
TwitterClient = require('./twitter_client')

jQuery ($) ->
  # Follow window resize
  $(window).on('resize', ->
    frameHeight = $('.header').height() + $('.editor').height() + $('.tabs').height()
    magicOffset = 8
    $('.tweets').height($(window).height() - (frameHeight + magicOffset))
  )

  # initialize timeline
  twitterClient = new TwitterClient()
  twitterClient.homeTimeline (tweet) ->
    template = $('.tweets .tweet.hidden-template')
    element  = template.clone(true)
    element.removeClass('hidden-template')
    element.find('.tweet-header').text(tweet.user.screen_name)
    element.find('.tweet-body').text(tweet.text)
    element.insertAfter(template)
