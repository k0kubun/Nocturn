module.exports =
class TweetSubmitter
  @keycodes: {
    enter: 13,
  }

  constructor: (twitterClient) ->
    @twitterClient = twitterClient

  watch: (textarea) ->
    submitter = this
    textarea.on('keypress', (event) ->
      switch event.keyCode
        when TweetSubmitter.keycodes['enter']
          if event.altKey
            return

          event.preventDefault()
          tweet = textarea.val()
          textarea.val('')
          submitter.updateStatus(tweet)
    )

  updateStatus: (tweet) ->
    return if tweet == ''
    @twitterClient.updateStatus(tweet)
