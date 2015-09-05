remote         = require('remote')
Authentication = remote.require('./authentication')

module.exports =
class AccountList
  @rebuild: ($) ->
    $('#account_selector option').remove()
    AccountList.build($)

  @build: ($) ->
    for account in Authentication.allAccounts()
      option = $('<option>')
      option.attr('value', account['screenName'])
      option.text(account['screenName'])
      $('#account_selector').append(option)

    option = $('<option>')
    option.attr('value', 'add-account')
    option.text('Add...')
    $('#account_selector').append(option)

  @switchTo: (screenName, $) ->
    $('#account_selector').data('prev', screenName)
    $('.timeline').removeClass('active')
    timeline = $(".timeline[data-screen-name='#{screenName}']")
    timeline.addClass('active')

    account = Authentication.byScreenName(screenName)
    $('.twitter_icon').attr('src', account['profileImage'])
