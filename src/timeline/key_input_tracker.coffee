module.exports =
class KeyInputTracker
  @keycodes: {
    enter:     13,
    backspace: 8,
  }

  constructor: (twitterClient, textarea, activeTweetFunc) ->
    @twitterClient   = twitterClient
    @textarea        = textarea
    @activeTweetFunc = activeTweetFunc

  watch: (target) ->
    twitterClient   = @twitterClient
    textarea        = @textarea
    activeTweetFunc = @activeTweetFunc

    target.on('keypress', (event) ->
      switch event.keyCode
        when KeyInputTracker.keycodes['enter']
          return unless textarea.is(':focus')
          return if event.altKey

          event.preventDefault()
          tweet = textarea.val()
          textarea.val('')
          twitterClient.updateStatus(tweet)
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
