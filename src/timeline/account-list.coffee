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
