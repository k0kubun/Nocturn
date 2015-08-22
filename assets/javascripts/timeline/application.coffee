jQuery ($) ->
  $(window).on('resize', ->
    frameHeight = $('.header').height() + $('.editor').height() + $('.tabs').height()
    $('.tweets').height($(window).height() - frameHeight)
  )
