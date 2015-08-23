jQuery = require('jquery')
TwitterClient   = require('./twitter_client')
TimelineResizer = require('./timeline_resizer')

jQuery ($) ->
  TimelineResizer.register($(window), $('.tweets'), [$('.header'), $('.editor'), $('.tabs')])

  appendTweet = (tweet) ->
    template = $('.tweets .tweet.hidden_template')
    element  = template.clone(true)
    element.removeClass('hidden_template')
    element.find('.user_name').text(tweet.user.name)
    element.find('.screen_name').text(tweet.user.screen_name)
    element.find('.tweet_body').text(tweet.text)
    element.find('.user_icon').attr('src', tweet.user.profile_image_url)
    element.insertAfter(template)

  # initialize timeline
  twitterClient = new TwitterClient()
  twitterClient.homeTimeline(appendTweet)

  # loop userstream
  twitterClient.userStream(appendTweet)
