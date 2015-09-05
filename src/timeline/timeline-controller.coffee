TwitterClient  = require('../twitter-client')
TweetDecorator = require('./tweet-decorator')

module.exports =
class TimelineController
  $ = null

  @createTimeline: (account, jQuery) ->
    $ = jQuery
    controller = new TimelineController(account)
    controller.loadHome()
    controller.loadMentions()
    controller.startHomeStream()

  constructor: (account) ->
    @client   = new TwitterClient(account)
    @timeline = $(".timeline[data-screen-name='#{account['screenName']}']")

  loadHome: ->
    prependTweet = this.prependTweetIn(this.homeTab())
    @client.homeTimeline((tweets) ->
      for tweet in tweets.reverse()
        prependTweet(tweet)
    )

  loadMentions: ->
    prependTweet = this.prependTweetIn(this.mentionTab())
    @client.mentionsTimeline((tweets) ->
      for tweet in tweets.reverse()
        prependTweet(tweet)
    )

  startHomeStream: ->
    prependTweet = this.prependTweetIn(this.homeTab())
    @client.userStream((tweet) ->
      prependTweet(tweet)
    )

  homeTab: ->
    @timeline.find('#home')

  mentionTab: ->
    @timeline.find('#mentions')

  prependTweetIn: (tab) ->
    hasTweet = this.hasTweetIn(tab)
    (tweet) ->
      return if hasTweet(tweet.id_str)
      tab.prepend(TweetDecorator.create(tweet, $))

  hasTweetIn: (tab) ->
    (id) ->
      tab.find(".tweet[data-id=#{id}]").length > 0
