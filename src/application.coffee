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
    if $(".tweet[data-id=#{tweet.id}]").length == 0
      TweetDecorator.decorate(template.clone(true), tweet).insertAfter(template)

  # initialize timeline
  twitterClient = new TwitterClient()
  twitterClient.homeTimeline(appendTweet)
  twitterClient.userStream(appendTweet)

  # watch key inputs
  keyInputTracker = new KeyInputTracker(twitterClient, $)
  keyInputTracker.watch($(window))

  # tweet selection
  $(document).delegate('.tweet', 'click', ->
    $('.tweet').removeClass('active')
    $(this).addClass('active')
  )

  # favorite tweet
  $(document).delegate('.favorite_button', 'click', ->
    button = $(this)
    tweet  = button.closest('.tweet')
    twitterClient.favoriteStatus(tweet.data('id'), ->
      button.addClass('active')
    )
  )

  # reply tweet
  $(document).delegate('.reply_button', 'click', ->
    tweet = $(this).closest('.tweet')
    $('.in_reply_to').data('id', tweet.data('id'))

    textarea = $('.tweet_editor')
    username = tweet.find('.screen_name').text()
    textarea.val("@#{username} ")
    textarea.focus()
  )

  # home button
  $(document).delegate('.home_button', 'click', (event) ->
    require('shell').openExternal('https://twitter.com')
  )

  # refresh button
  $(document).delegate('.refresh_button', 'click', (event) ->
    twitterClient.homeTimeline(appendTweet)
  )

  # this is just a workaround to avoid focusing on the invisible third item
  $('.focus_trigger').focus ->
    $('.focus_standby').focus()
  $('.focus_standby').focus()
