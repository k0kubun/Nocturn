remote             = require('remote')
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
  TimelineDelegation.delegate($)
  TimelineResizer.register($(window), $('.tweets'), [$('.header'), $('.editor'), $('.tabs')])
  HeaderMenu.register($)
  FocusManager.bind($)
  TabManager.bind($)

  # watch key inputs
  twitterClient = new TwitterClient(Authentication.defaultAccount())
  keyInputTracker = new KeyInputTracker(twitterClient, $)
  keyInputTracker.watch($(window))

  # reply tweet
  $(document).delegate('.reply_button', 'click', ->
    tweet = $(this).closest('.tweet')
    $('.in_reply_to').data('id', tweet.data('id'))

    textarea = $('.tweet_editor')
    username = tweet.find('.screen_name').text()
    textarea.val("@#{username} ")
    textarea.focus()
  )

  # Initialize account list
  for account in Authentication.allAccounts()
    option = $('<option>')
    option.attr('value', account['screenName'])
    option.text(account['screenName'])
    option.insertBefore('#account_selector option[value="add-account"]')

  currentAccount = Authentication.defaultAccount()
  $('#account_selector').val(currentAccount['screenName'])
  $('#account_selector').data('prev', currentAccount['screenName'])
  $('.twitter_icon').attr('src', currentAccount['profileImage'])

  # FIXME: move this inside TimelineController.createTimeline() later
  timeline = $('.timeline')
  timeline.addClass('active')
  timeline.attr('data-screen-name', currentAccount['screenName'])

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
          # TODO: add timeline
        )
    else
      $('#account_selector').data('prev', $('#account_selector').val())
      # TODO: change timeline
  )
