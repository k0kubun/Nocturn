remote = require('remote')
Authentication = remote.require('./authentication')

jQuery = require('jquery')
jQuery ($) ->
  $(document).delegate('.add_account', 'click', (event) ->
    event.preventDefault()
    new Authentication (token) ->
      # noop
  )
