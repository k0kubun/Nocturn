module.exports =
class KeyInputTracker
  @keycodes: {
    enter: 13,
  }

  constructor: (twitterClient, textarea) ->
    @twitterClient = twitterClient
    @textarea      = textarea

  watch: (target) ->
    twitterClient = @twitterClient
    textarea      = @textarea

    target.on('keypress', (event) ->
      switch event.keyCode
        when KeyInputTracker.keycodes['enter']
          if event.altKey
            return

          event.preventDefault()
          tweet = textarea.val()
          textarea.val('')
          twitterClient.updateStatus(tweet)
    )
