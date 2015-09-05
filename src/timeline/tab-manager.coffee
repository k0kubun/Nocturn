module.exports =
class TabManager
  @bind: ($) ->
    $(document).delegate('.tabs .tab', 'click', (event) ->
      TabManager.activate($(this), $)
    )

  @activate: (tab, $) ->
    timeline = tab.closest('.timeline')
    timeline.find('.tabs .tab').removeClass('active')
    tab.addClass('active')

    timeline.find('.tweets').removeClass('active')
    timeline.find(tab.data('selector')).addClass('active')

    TabManager.switchHeader(timeline, tab, $)

  @switchHeader: (timeline, tab, $) ->
    timeline.find('.tweets_header').removeClass('active')
    selector = tab.data('activate')
    return unless selector

    timeline.find(selector).addClass('active')

  @selectNext: ($) ->
    activeTab = $('.timeline.active .tabs .tab.active')
    nextTab = activeTab.next()
    return if nextTab.length == 0

    TabManager.activate(nextTab, $)

  @selectPrev: ($) ->
    activeTab = $('.timeline.active .tabs .tab.active')
    prevTab = activeTab.prev()
    return if prevTab.length == 0

    TabManager.activate(prevTab, $)
