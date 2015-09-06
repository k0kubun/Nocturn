AccountList        = require('./account-list')
Authentication     = require('remote').require('./authentication')
TabManager         = require('./tab-manager')
TimelineController = require('./timeline-controller')
TweetDecorator     = require('./tweet-decorator')
TwitterClient      = require('../twitter-client')

module.exports =
class KeyInputTracker
  $ = null

  @keycodes: {
    # keydown
    backspace:     8,
    up:            38,
    down:          40,
    cmd_j:         74,
    cmd_k:         75,
    o:             79,
    p:             80,
    v:             86,
    left_bracket:  219,
    right_bracket: 221,

    # keypress
    enter: 13,
    space: 32,
    zero:  48,
    f:     102,
    j:     106,
    k:     107,
  }

  constructor: (jQuery) ->
    $ = jQuery
    @textarea     = $('.tweet_editor')
    @inReplyTo    = $('.in_reply_to')
    @insertInside = (target, element) ->
      insertId = element.data('id')
      return if target.find(".tweet[data-id=#{insertId}]").length > 0

      if target.find('.tweet').length == 0
        element.insertAfter(target.find('.insert_target'))
        return

      target.find('.tweet').each(->
        tweet = $(this)
        if insertId > tweet.data('id')
          $('.tweet').finish()
          element.insertBefore(tweet)
          return false
      )
      if target.find(".tweet[data-id='#{insertId}']").length == 0
        element.insertAfter(target.find('.insert_target'))

  watch: (target) ->
    textarea     = @textarea
    inReplyTo    = @inReplyTo
    insertInside = @insertInside

    currentClient = ->
      screenName = $('.timeline.active').data('screen-name')
      new TwitterClient(Authentication.byScreenName(screenName))

    invokeReply = ->
      activeTweet = $('.timeline.active .tweets.active .tweet.active')
      return if activeTweet.length == 0

      tweetId = activeTweet.data('id')
      inReplyTo.data('id', tweetId)

      username = activeTweet.find('.screen_name').text()
      textarea.val("@#{username} ")
      textarea.focus()

    activeTabPane = ->
      activeTab = $('.timeline.active .tab.active')
      $('.timeline.active').find(".tweets#{activeTab.data('selector')}")

    selectFirstTweet = ->
      $('.tweet').removeClass('active')
      tweets = activeTabPane().find('.tweet')
      return if tweets.length == 0

      tweets.each ->
        $(this).addClass('active')
        return false

      # immediately scroll to top
      activeTabPane().animate({ scrollTop: 0 }, 0)

    selectNextTweet = ->
      activeTweet = activeTabPane().find('.tweet.active')
      return selectFirstTweet() if activeTweet.length == 0

      nextTweet = activeTweet.next()
      return if nextTweet.length == 0

      activeTabPane().find('.tweet').removeClass('active')
      nextTweet.addClass('active')

      pane = activeTabPane()
      visibleLimit = pane.height()
      activeBottom = nextTweet.offset().top
      if visibleLimit < activeBottom
        pane.finish()
        pane.animate({ scrollTop: pane.scrollTop() + pane.height() / 2 }, 'fast')

    selectPrevTweet = ->
      activeTweet = activeTabPane().find('.tweet.active')
      return if activeTweet.length == 0

      prevTweet = activeTweet.prev()
      return if prevTweet.length == 0

      return if prevTweet.is('.insert_target')

      activeTabPane().find('.tweet').removeClass('active')
      prevTweet.addClass('active')

      pane = activeTabPane()
      visibleLimit = 0
      activeTop    = prevTweet.offset().top - prevTweet.height() * 2
      if visibleLimit > activeTop
        pane.finish()
        pane.animate({ scrollTop: pane.scrollTop() - pane.height() / 2 }, 'fast')

    screenNames = ->
      names = []
      $('#account_selector option').each ->
        name = $(this).val()
        unless name == 'add-account'
          names.push(name)
      names

    selectNextAccount = ->
      names = screenNames()
      currentIndex = names.indexOf($('#account_selector').val())
      nextIndex = currentIndex + 1
      if nextIndex < names.length
        screenName = names[nextIndex]
        $('#account_selector').val(screenName)
        AccountList.switchTo(screenName, $)

    selectPrevAccount = ->
      names = screenNames()
      currentIndex = names.indexOf($('#account_selector').val())
      prevIndex = currentIndex - 1
      if 0 <= prevIndex
        screenName = names[prevIndex]
        $('#account_selector').val(screenName)
        AccountList.switchTo(screenName, $)

    target.on('keydown', (event) ->
      switch event.keyCode
        when KeyInputTracker.keycodes['backspace']
          return if event.metaKey != true

          activeTweet = activeTabPane().find('.tweet.active')
          return if activeTweet.length == 0

          tweetId = activeTweet.data('id')
          currentClient().deleteStatus(tweetId, ->
            activeTweet.remove()
          )

        when KeyInputTracker.keycodes['up']
          return if textarea.is(':focus')
          event.preventDefault()
          selectPrevTweet()

        when KeyInputTracker.keycodes['down']
          return if textarea.is(':focus')
          event.preventDefault()
          selectNextTweet()

        when KeyInputTracker.keycodes['left_bracket'], KeyInputTracker.keycodes['o']
          return if event.metaKey != true
          event.preventDefault()
          TabManager.selectPrev($)

        when KeyInputTracker.keycodes['right_bracket'], KeyInputTracker.keycodes['p']
          return if event.metaKey != true
          event.preventDefault()
          TabManager.selectNext($)

        when KeyInputTracker.keycodes['cmd_j']
          return if event.metaKey != true
          event.preventDefault()
          selectNextAccount()

        when KeyInputTracker.keycodes['cmd_k']
          return if event.metaKey != true
          event.preventDefault()
          selectPrevAccount()

        when KeyInputTracker.keycodes['v']
          return if event.metaKey != true
          return if event.shiftKey != true
          event.preventDefault()

          activeTweet = activeTabPane().find('.tweet.active')
          return if activeTweet.length == 0

          tweetId = activeTweet.data('id')
          currentClient().retweetStatus(tweetId)
    )

    target.on('keypress', (event) ->
      switch event.keyCode
        when KeyInputTracker.keycodes['enter']
          if $('.timeline.active .search_field').is(':focus')
            event.preventDefault()
            query = $('.timeline.active .search_field').val()

            screenName = $('.timeline.active').data('screen-name')
            controller = new TimelineController(Authentication.byScreenName(screenName))
            controller.loadSearch(query)
            return

          unless textarea.is(':focus')
            event.preventDefault()
            invokeReply()
            return
          return if event.altKey

          event.preventDefault()
          tweet = textarea.val()
          textarea.val('')
          currentClient().updateStatus(tweet, inReplyTo.data('id'))
          inReplyTo.data('id', 0)

        when KeyInputTracker.keycodes['f']
          return if textarea.is(':focus')
          activeTweet = $('.tweet.active')
          return if activeTweet.length == 0

          currentClient().favoriteStatus(activeTweet.data('id'), ->
            activeTweet.find('.favorite_button').addClass('active')
          )

        when KeyInputTracker.keycodes['space'], KeyInputTracker.keycodes['zero']
          return if textarea.is(':focus')
          event.preventDefault()
          selectFirstTweet()

        when KeyInputTracker.keycodes['j']
          return if textarea.is(':focus')
          event.preventDefault()
          selectNextTweet()

        when KeyInputTracker.keycodes['k']
          return if textarea.is(':focus')
          event.preventDefault()
          selectPrevTweet()
    )
