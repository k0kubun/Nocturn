TweetDecorator  = require('./tweet_decorator')

module.exports =
class KeyInputTracker
  $ = null

  @keycodes: {
    enter:     13,
    backspace: 8,
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
    )
