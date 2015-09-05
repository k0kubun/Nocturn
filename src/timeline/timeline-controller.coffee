TwitterClient  = require('../twitter-client')
TweetDecorator = require('./tweet-decorator')

module.exports =
class TimelineController
  $ = null

  @createTimeline: (account, jQuery) ->
    $ = jQuery
    timeline = $('.timeline').clone(false)
    timeline.attr('data-screen-name', account['screenName'])
    $('.timelines').append(timeline)

    controller = new TimelineController(account)
    controller.loadHome()
    controller.loadMentions()
    controller.startHomeStream()
    controller.initLists()

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

  initLists: ->
    timeline = @timeline
    @client.listsList((lists) ->
      for list in lists
        target  = timeline.find('.list_default')
        element = target.clone(false)
        element.removeClass('list_default')
        element.attr('value', list['id'])
        element.text(list['full_name'])
        element.insertAfter(target)
    )

  loadList: (listId) ->
    prependTweet = this.prependTweetIn(this.listsTab())
    @client.listsStatuses(listId, (tweet) ->
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

  listsTab: ->
    @timeline.find('#lists')

  prependTweetIn: (tab) ->
    hasTweet = this.hasTweetIn(tab)
    (tweet) ->
      return if hasTweet(tweet.id_str)
      tab.prepend(TweetDecorator.create(tweet, $))

  hasTweetIn: (tab) ->
    (id) ->
      tab.find(".tweet[data-id=#{id}]").length > 0
