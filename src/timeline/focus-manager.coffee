module.exports =
class FocusManager
  @bind: ($) ->
    # this is just a workaround to avoid focusing on the invisible third item
    $('.focus_trigger').focus ->
      $('.focus_standby').focus()
    $('.focus_standby').focus()
