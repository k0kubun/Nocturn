module.exports =
class KeyInputTracker
  @keycodes: {
    enter:     13,
    backspace: 8,
  }

  constructor: (twitterClient, textarea, activeTweetFunc, inReplyTo) ->
    @twitterClient   = twitterClient
    @textarea        = textarea
    @activeTweetFunc = activeTweetFunc
    @inReplyTo       = inReplyTo

  watch: (target) ->
    twitterClient   = @twitterClient
    textarea        = @textarea
    activeTweetFunc = @activeTweetFunc
    inReplyTo       = @inReplyTo

    invokeReply = ->
      activeTweet = activeTweetFunc()
      return if activeTweet.length == 0

      tweetId = activeTweet.data('id')
      inReplyTo.data('id', tweetId)

      username = activeTweet.find('.screen_name').text()
      textarea.val("@#{username} ")
      textarea.focus()

    target.on('keypress', (event) ->
      switch event.keyCode
        when KeyInputTracker.keycodes['enter']
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

          activeTweet = activeTweetFunc()
          return if activeTweet.length == 0

          tweetId = activeTweet.data('id')
          twitterClient.deleteStatus(tweetId, ->
            activeTweet.remove()
          )
    )
