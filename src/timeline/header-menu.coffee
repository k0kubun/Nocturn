remote             = require('remote')
Authentication     = remote.require('./authentication')
TimelineController = require('./timeline-controller')

module.exports =
class HeaderMenu
  @register: ($) ->
    HeaderMenu.registerHome($)
    HeaderMenu.registerRefresh($)

  @registerHome: ($) ->
    $(document).delegate('.home_button', 'click', (event) ->
      require('shell').openExternal('https://twitter.com')
    )

  @registerRefresh: ($) ->
    $(document).delegate('.refresh_button', 'click', (event) ->
      timeline = $('.timeline.active')

      screenName = timeline.data('screen-name')
      controller = new TimelineController(Authentication.byScreenName(screenName))
      controller.loadHome()
      controller.loadMentions()

      listId = timeline.find('.lists_field').val()
      if listId != '0'
        console.log('a')
        # twitterClient.listsStatuses(listId, appendList)
    )
