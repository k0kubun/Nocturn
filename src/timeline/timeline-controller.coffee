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

  constructor: (account) ->
    @client   = new TwitterClient(account)
    @timeline = $(".timeline[data-screen-name='#{account['screenName']}']")

  loadHome: ->
    tab         = this.homeTab()
    hasTweet    = this.hasTweetIn(tab)
    appendTweet = this.appendTweetIn(tab)

    @client.homeTimeline((tweets) ->
      for tweet in tweets
        continue if hasTweet(tweet.id_str)
        appendTweet(tweet)
    )

  loadMentions: ->
    tab         = this.mentionTab()
    hasTweet    = this.hasTweetIn(tab)
    appendTweet = this.appendTweetIn(tab)

    @client.mentionsTimeline((tweets) ->
      for tweet in tweets
        continue if hasTweet(tweet.id_str)
        appendTweet(tweet)
    )

  homeTab: ->
    @timeline.find('#home')

  mentionTab: ->
    @timeline.find('#mentions')

  hasTweetIn: (tab) ->
    (id) ->
      tab.find(".tweet[data-id=#{id}]").length > 0

  appendTweetIn: (tab) ->
    (tweet) ->
      tab.append(TweetDecorator.create(tweet, $))
