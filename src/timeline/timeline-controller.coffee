TwitterClient  = require('../twitter-client')
TweetDecorator = require('./tweet-decorator')

module.exports =
class TimelineController
  $ = null

  @createTimeline: (account, jQuery) ->
    $ = jQuery
    controller = new TimelineController(account)
    controller.loadMentions()

  constructor: (account) ->
    @client   = new TwitterClient(account)
    @timeline = $(".timeline[data-screen-name='#{account['screenName']}']")

  loadMentions: ->
    tab         = this.mentionTab()
    hasTweet    = this.hasTweetIn(tab)
    appendTweet = this.appendTweetIn(tab)

    @client.mentionsTimeline((tweets) ->
      for tweet in tweets
        continue if hasTweet(tweet.id_str)
        appendTweet(tweet)
    )

  mentionTab: ->
    @timeline.find('#mentions')

  hasTweetIn: (tab) ->
    (id) ->
      tab.find(".tweet[data-id=#{id}]").length > 0

  appendTweetIn: (tab) ->
    (tweet) ->
      tab.append(TweetDecorator.create(tweet, $))
