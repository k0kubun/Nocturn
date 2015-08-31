module.exports =
class TabManager
  @bind: ($) ->
    $(document).delegate('.tabs .tab', 'click', (event) ->
      TabManager.activate($(this), $)
    )

  @activate: (tab, $) ->
    $('.tabs .tab').removeClass('active')
    tab.addClass('active')

    $('.tweets').removeClass('active')
    $("##{tab.data('id')}").addClass('active')

    $('.tweets_header').removeClass('active')
    if $('#lists').hasClass('active')
      $('.lists_selector').addClass('active')
    else if $('#search').hasClass('active')
      $('.search_box').addClass('active')

  @selectNext: ($) ->
    activeTab = $('.tabs .tab.active')
    nextTab = activeTab.next()
    return if nextTab.length == 0

    TabManager.activate(nextTab, $)

  @selectPrev: ($) ->
    activeTab = $('.tabs .tab.active')
    prevTab = activeTab.prev()
    return if prevTab.length == 0

    TabManager.activate(prevTab, $)
