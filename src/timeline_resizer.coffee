module.exports =
class TimelineResizer
  @magicOffset: 8

  @register: (parent, target, frames) ->
    height = 0
    for frame in frames
      height += frame.height()

    parent.on('resize', ->
      target.height(parent.height() - (height + TimelineResizer.magicOffset))
    )
