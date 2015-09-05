remote             = require('remote')
AccountList        = require('./account-list')
Authentication     = remote.require('./authentication')
FocusManager       = require('./focus-manager')
HeaderMenu         = require('./header-menu')
KeyInputTracker    = require('./key-input-tracker')
TabManager         = require('./tab-manager')
TimelineController = require('./timeline-controller')
TimelineDelegation = require('./timeline-delegation')
TimelineResizer    = require('./timeline-resizer')
TweetDecorator     = require('./tweet-decorator')
TwitterClient      = require('../twitter-client')

jQuery = require('jquery')
jQuery ($) ->
  AccountList.build($)
  TimelineDelegation.delegate($)
  TimelineResizer.register($(window), $('.tweets'), [$('.header'), $('.editor'), $('.tabs')])
  HeaderMenu.register($)
  FocusManager.bind($)
  TabManager.bind($)

  # watch key inputs
  twitterClient = new TwitterClient(Authentication.defaultAccount())
  keyInputTracker = new KeyInputTracker(twitterClient, $)
  keyInputTracker.watch($(window))

  currentAccount = Authentication.defaultAccount()
  $('#account_selector').val(currentAccount['screenName'])
  $('#account_selector').data('prev', currentAccount['screenName'])
  $('.twitter_icon').attr('src', currentAccount['profileImage'])

  TimelineController.createTimeline(currentAccount, $)

  # Account changer
  $(document).delegate('.twitter_icon', 'click', (e) ->
    e.preventDefault()
    dropdown = document.getElementById('account_selector')
    event = document.createEvent('MouseEvents')
    event.initMouseEvent('mousedown', true, true, window)
    dropdown.dispatchEvent(event)
  )

  $(document).delegate('#account_selector', 'change', (event) ->
    value = $('#account_selector').val()

    if value == 'add-account'
      $('#account_selector').val($('#account_selector').data('prev'))
      new Authentication (token) ->
        Authentication.addToken(token, ->
          AccountList.rebuild($)
        )
    else
      $('#account_selector').data('prev', $('#account_selector').val())
      # TODO: change timeline
  )
