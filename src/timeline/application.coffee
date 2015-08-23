jQuery = require('jquery')
TwitterClient   = require('./twitter_client')
TimelineResizer = require('./timeline_resizer')

jQuery ($) ->
  TimelineResizer.register($(window), $('.tweets'), [$('.header'), $('.editor'), $('.tabs')])

  appendTweet = (tweet) ->
    template = $('.tweets .tweet.hidden-template')
    element  = template.clone(true)
    element.removeClass('hidden-template')
    element.find('.tweet-header').text(tweet.user.screen_name)
    element.find('.tweet-body').text(tweet.text)
    element.insertAfter(template)

  # initialize timeline
  twitterClient = new TwitterClient()
  twitterClient.homeTimeline(appendTweet)

  # loop userstream
  twitterClient.userStream(appendTweet)
