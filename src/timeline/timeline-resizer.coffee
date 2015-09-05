module.exports =
class TimelineResizer
  @magicOffset: 8

  @register: ($, frames) ->
    height = 0
    for frame in frames
      height += frame.height()

    $(window).on('resize', ->
      resized = $(window).height() - (height + TimelineResizer.magicOffset)
      $('.tweets').height(resized)
    ).trigger('resize') # on page load
