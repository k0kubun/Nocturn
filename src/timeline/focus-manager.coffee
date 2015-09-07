module.exports =
class FocusManager
  @tabKeyCode = 9

  @bind: ($) ->
    $(document).on('keydown', (event) ->
      return if event.keyCode != FocusManager.tabKeyCode
      return if $('.tweet_editor').is(':focus')

      event.preventDefault()
      $('.tweet_editor').focus()
    )
