KeyInputTracker = require('./key_input_tracker')
TimelineResizer = require('./timeline_resizer')
TweetDecorator  = require('./tweet_decorator')
TwitterClient   = require('./twitter_client')

jQuery = require('jquery')
jQuery ($) ->
  # floating height for .tweets
  TimelineResizer.register($(window), $('.tweets'), [$('.header'), $('.editor'), $('.tabs')])

  insertInside = (target, element) ->
    insertId = element.data('id')
    return if target.find(".tweet[data-id=#{insertId}]").length > 0

    if target.find('.tweet').length == 0
      element.insertAfter(target.find('.insert_target'))
      return

    target.find('.tweet').each(->
      tweet = $(this)
      if insertId > tweet.data('id')
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
  twitterClient = new TwitterClient()
  twitterClient.verifyCredentials((user) ->
    $('.current_user').data('id', user.id_str)
    $('.current_user').data('name', user.screen_name)

    twitterClient.mentionsTimelineWithCallback(appendTweet, ->
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
    twitterClient.mentionsTimeline(appendTweet)

    listId = $('.lists_field').val()
    if listId != '0'
      twitterClient.listsStatuses(listId, appendList)
  )

  # tab changes
  $(document).delegate('.tabs .tab', 'click', (event) ->
    $('.tabs .tab').removeClass('active')
    tab = $(this)
    tab.addClass('active')

    $('.tweets').removeClass('active')
    $("##{tab.data('id')}").addClass('active')

    $('.tweets_header').removeClass('active')
    if $('#lists').hasClass('active')
      $('.lists_selector').addClass('active')
    else if $('#search').hasClass('active')
      $('.search_box').addClass('active')
  )

  # this is just a workaround to avoid focusing on the invisible third item
  $('.focus_trigger').focus ->
    $('.focus_standby').focus()
  $('.focus_standby').focus()
