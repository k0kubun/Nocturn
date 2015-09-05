remote             = require('remote')
Authentication     = remote.require('./authentication')
TimelineController = require('./timeline-controller')
TwitterClient      = require('../twitter-client')

module.exports =
class TimelineDelegation
  @delegate: ($) ->
    TimelineDelegation.delegateLists($)
    TimelineDelegation.delegateTweetSelection($)
    TimelineDelegation.delegateFavorite($)

  @delegateLists: ($) ->
    $(document).delegate('.lists_field', 'change', (event) ->
      timeline = $(this).closest('.timeline')
      timeline.find('#lists .tweet').remove()

      id = timeline.find('.lists_field').val()
      return if id == '0'

      screenName = timeline.data('screen-name')
      controller = new TimelineController(Authentication.byScreenName(screenName))
      controller.loadList(id)
    )

  @delegateTweetSelection: ($) ->
    $(document).delegate('.tweet', 'click', ->
      pane = $(this).closest('.tweets')
      pane.find('.tweet').removeClass('active')
      $(this).addClass('active')
    )

  @delegateFavorite: ($) ->
    $(document).delegate('.favorite_button', 'click', ->
      button = $(this)
      tweet  = button.closest('.tweet')
      screenName = $(this).closest('.timeline').data('screen-name')
      twitterClient = new TwitterClient(Authentication.byScreenName(screenName))
      twitterClient.favoriteStatus(tweet.data('id'), ->
        button.addClass('active')
      )
    )
