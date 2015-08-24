TweetDecorator  = require('./tweet_decorator')

module.exports =
class KeyInputTracker
  $ = null

  @keycodes: {
    # keydown
    backspace: 8,
    up:        38,
    down:      40,

    # keypress
    enter:     13,
    space:     32,
    zero:      48,
    f:         102,
    j:         106,
  }

  constructor: (twitterClient, jQuery, insertInside) ->
    $ = jQuery
    @twitterClient   = twitterClient
    @textarea        = $('.tweet_editor')
    @inReplyTo       = $('.in_reply_to')
    @insertInside    = insertInside

  watch: (target) ->
    twitterClient   = @twitterClient
    textarea        = @textarea
    inReplyTo       = @inReplyTo
    insertInside    = @insertInside

    invokeReply = ->
      activeTweet = $('.tweet.active')
      return if activeTweet.length == 0

      tweetId = activeTweet.data('id')
      inReplyTo.data('id', tweetId)

      username = activeTweet.find('.screen_name').text()
      textarea.val("@#{username} ")
      textarea.focus()

    target.on('keypress', (event) ->
      switch event.keyCode
        when KeyInputTracker.keycodes['enter']
          if $('.search_field').is(':focus')
            event.preventDefault()
            $('#search .tweet').remove()

            query = $('.search_field').val()
            twitterClient.searchTweets(query, (tweet) ->
              if $("#search .tweet[data-id=#{tweet.id_str}]").length == 0
                template = $('.template_wrapper .hidden_template')
                element = TweetDecorator.decorate(template.clone(false), tweet)
                insertInside($('#search'), element)
            )
            return

          unless textarea.is(':focus')
            event.preventDefault()
            invokeReply()
            return
          return if event.altKey

          event.preventDefault()
          tweet = textarea.val()
          textarea.val('')
          twitterClient.updateStatus(tweet, inReplyTo.data('id'))
          inReplyTo.data('id', 0)

        when KeyInputTracker.keycodes['f']
          return if textarea.is(':focus')
          activeTweet = $('.tweet.active')
          return if activeTweet.length == 0

          twitterClient.favoriteStatus(activeTweet.data('id'), ->
            activeTweet.find('.favorite_button').addClass('active')
          )

        when KeyInputTracker.keycodes['space'], KeyInputTracker.keycodes['zero']
          return if textarea.is(':focus')
          event.preventDefault()

        when KeyInputTracker.keycodes['j']
          return if textarea.is(':focus')
          event.preventDefault()

        when KeyInputTracker.keycodes['k']
          return if textarea.is(':focus')
          event.preventDefault()
    )

    target.on('keydown', (event) ->
      switch event.keyCode
        when KeyInputTracker.keycodes['backspace']
          return if event.metaKey != true

          activeTweet = $('.tweet.active')
          return if activeTweet.length == 0

          tweetId = activeTweet.data('id')
          twitterClient.deleteStatus(tweetId, ->
            activeTweet.remove()
          )

        when KeyInputTracker.keycodes['up']
          return if textarea.is(':focus')
          event.preventDefault()

        when KeyInputTracker.keycodes['down']
          return if textarea.is(':focus')
          event.preventDefault()
    )
