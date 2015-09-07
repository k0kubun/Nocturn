module.exports =
class FocusManager
  @tabKeyCode = 9

  @bind: ($) ->
    $(document).on('keydown', (event) ->
      return if event.keyCode != FocusManager.tabKeyCode

      unless $('.tweet_editor').is(':focus')
        event.preventDefault()
        $('.tweet_editor').focus()
    )
