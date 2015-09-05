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

jQuery = require('jquery')
jQuery ($) ->
  AccountList.build($)
  TimelineDelegation.delegate($)
  TimelineResizer.register($, [$('.header'), $('.editor'), $('.tabs')])
  HeaderMenu.register($)
  FocusManager.bind($)
  TabManager.bind($)

  # watch key inputs
  keyInputTracker = new KeyInputTracker($)
  keyInputTracker.watch($(window))

  # Initialize timelines
  for account in Authentication.allAccounts()
    TimelineController.createTimeline(account, $)

  # Activate first account
  currentAccount = Authentication.defaultAccount()
  timeline = $(".timeline[data-screen-name='#{currentAccount['screenName']}']")
  timeline.addClass('active')
  $('#account_selector').val(currentAccount['screenName'])
  $('#account_selector').data('prev', currentAccount['screenName'])
  $('.twitter_icon').attr('src', currentAccount['profileImage'])

  # Hack to create account selector view
  $(document).delegate('.twitter_icon', 'click', (e) ->
    e.preventDefault()
    dropdown = document.getElementById('account_selector')
    event = document.createEvent('MouseEvents')
    event.initMouseEvent('mousedown', true, true, window)
    dropdown.dispatchEvent(event)
  )

  # Invoke account selector
  $(document).delegate('#account_selector', 'change', (event) ->
    value = $('#account_selector').val()

    if value == 'add-account'
      oldLength = Authentication.allAccounts().length
      $('#account_selector').val($('#account_selector').data('prev'))
      new Authentication (token) ->
        Authentication.addToken(token, ->
          if Authentication.allAccounts().length > oldLength
            AccountList.rebuild($)
            TimelineController.createTimeline(token, $)
            AccountList.switchTo(token['screenName'], $)
            $('#account_selector').val(token['screenName'])
        )
    else
      screenName = $('#account_selector').val()
      AccountList.switchTo(screenName, $)
  )
