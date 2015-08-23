jQuery = require('jquery')
TweetDecorator  = require('./tweet_decorator')
TweetSubmitter  = require('./tweet_submitter')
TwitterClient   = require('./twitter_client')
TimelineResizer = require('./timeline_resizer')

jQuery ($) ->
  TimelineResizer.register($(window), $('.tweets'), [$('.header'), $('.editor'), $('.tabs')])

  appendTweet = (tweet) ->
    template = $('.tweets .tweet.hidden_template')
    element  = TweetDecorator.decorate(template.clone(true), tweet)
    element.insertAfter(template)

  # initialize timeline
  twitterClient = new TwitterClient()
  twitterClient.homeTimeline(appendTweet)

  # watch textarea
  tweetSubmitter = new TweetSubmitter(twitterClient)
  tweetSubmitter.watch($('.tweet_editor'))

  # loop userstream
  twitterClient.userStream(appendTweet)
