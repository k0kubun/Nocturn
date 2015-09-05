remote          = require('remote')
Authentication  = remote.require('./authentication')
KeyInputTracker = require('./key-input-tracker')
TabManager      = require('./tab-manager')
TimelineResizer = require('./timeline-resizer')
TweetDecorator  = require('./tweet-decorator')
TwitterClient   = require('../twitter-client')

jQuery = require('jquery')
jQuery ($) ->
  TimelineResizer.register($(window), $('.tweets'), [$('.header'), $('.editor'), $('.tabs')])
  TabManager.bind($)

  insertInside = (target, element) ->
    insertId = element.data('id')
    return if target.find(".tweet[data-id=#{insertId}]").length > 0

    if target.find('.tweet').length == 0
      element.insertAfter(target.find('.insert_target'))
      return

    target.find('.tweet').each(->
      tweet = $(this)
      if insertId > tweet.data('id')
        $('.tweet').finish()
        element.insertBefore(tweet)
        return false
    )
    if target.find(".tweet[data-id='#{insertId}']").length == 0
      element.insertAfter(target.find('.insert_target'))

  appendTweet = (tweet) ->
    template = $('.template_wrapper .hidden_template')
    if $("#timeline .tweet[data-id=#{tweet.id_str}]").length == 0
      element = TweetDecorator.decorate(template.clone(false), tweet)
      insertInside($('#timeline'), element)

    screenName = $('.current_user').data('name')
    if tweet.text.match(new RegExp("@#{screenName}"))
      if $("#mentions .tweet[data-id=#{tweet.id_str}]").length == 0
        element = TweetDecorator.decorate(template.clone(false), tweet)
        insertInside($('#mentions'), element)

  # initialize timeline
  twitterClient = new TwitterClient(Authentication.defaultAccount())
  twitterClient.verifyCredentials((user) ->
    $('.current_user').data('id', user.id_str)
    $('.current_user').data('name', user.screen_name)

    twitterClient.mentionsTimeline((tweets) ->
      for tweet in tweets.reverse()
        appendTweet(tweet)
      twitterClient.homeTimeline(appendTweet)
    )
    twitterClient.userStream(appendTweet)
  )

  # initialize list
  twitterClient.listsList((lists) ->
    for list in lists
      element = $('.list_default').clone(false)
      element.removeClass('list_default')
      element.attr('value', list['id'])
      element.text(list['full_name'])
      element.insertAfter($('.list_default'))
  )
  appendList = (tweet) ->
    if $("#lists .tweet[data-id=#{tweet.id_str}]").length == 0
      template = $('.template_wrapper .hidden_template')
      element = TweetDecorator.decorate(template.clone(false), tweet)
      insertInside($('#lists'), element)
  $(document).delegate('.lists_field', 'change', (event) ->
    $('#lists .tweet').remove()

    id = $('.lists_field').val()
    return if id == '0'

    twitterClient.listsStatuses(id, appendList)
  )

  # watch key inputs
  keyInputTracker = new KeyInputTracker(twitterClient, $, insertInside)
  keyInputTracker.watch($(window))

  # tweet selection
  $(document).delegate('.tweet', 'click', ->
    $('.tweet').removeClass('active')
    $(this).addClass('active')
  )

  # favorite tweet
  $(document).delegate('.favorite_button', 'click', ->
    button = $(this)
    tweet  = button.closest('.tweet')
    twitterClient.favoriteStatus(tweet.data('id'), ->
      button.addClass('active')
    )
  )

  # reply tweet
  $(document).delegate('.reply_button', 'click', ->
    tweet = $(this).closest('.tweet')
    $('.in_reply_to').data('id', tweet.data('id'))

    textarea = $('.tweet_editor')
    username = tweet.find('.screen_name').text()
    textarea.val("@#{username} ")
    textarea.focus()
  )

  # home button
  $(document).delegate('.home_button', 'click', (event) ->
    require('shell').openExternal('https://twitter.com')
  )

  # refresh button
  $(document).delegate('.refresh_button', 'click', (event) ->
    twitterClient.homeTimeline(appendTweet)
    twitterClient.mentionsTimeline((tweets) ->
      for tweet in tweets.reverse()
        appendTweet(tweet)
    )

    listId = $('.lists_field').val()
    if listId != '0'
      twitterClient.listsStatuses(listId, appendList)
  )

  # this is just a workaround to avoid focusing on the invisible third item
  $('.focus_trigger').focus ->
    $('.focus_standby').focus()
  $('.focus_standby').focus()

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
