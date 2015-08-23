KeyInputTracker = require('./key_input_tracker')
TimelineResizer = require('./timeline_resizer')
TweetDecorator  = require('./tweet_decorator')
TwitterClient   = require('./twitter_client')

jQuery = require('jquery')
jQuery ($) ->
  # floating height for .tweets
  TimelineResizer.register($(window), $('.tweets'), [$('.header'), $('.editor'), $('.tabs')])

  appendTweet = (tweet) ->
    template = $('.tweets .tweet.hidden_template')
    TweetDecorator.decorate(template.clone(true), tweet).insertAfter(template)

  # initialize timeline
  twitterClient = new TwitterClient()
  twitterClient.homeTimeline(appendTweet)
  twitterClient.userStream(appendTweet)

  # watch key inputs
  keyInputTracker = new KeyInputTracker(twitterClient, $('.tweet_editor'))
  keyInputTracker.watch($(window))

  $(document).delegate('.tweet', 'click', ->
    $('.tweet').removeClass('active')
    $(this).addClass('active')
  )

  # this is just a workaround to avoid focusing on the invisible third item
  $('.focus_trigger').focus ->
    $('.focus_standby').focus()
  $('.focus_standby').focus()
