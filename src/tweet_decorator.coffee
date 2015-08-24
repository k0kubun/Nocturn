module.exports =
class TweetDecorator
  @decorate: (element, tweet) ->
    element.removeClass('hidden_template')

    # use id_str to avoid overflow
    element.attr('data-id', tweet.id_str)

    element.find('.user_name').text(tweet.user.name)
    element.find('.screen_name').text(tweet.user.screen_name)

    element.find('.user_icon').attr('src', tweet.user.profile_image_url)
    element.find('.tweet_body').html(tweet.text.replace("\n", '<br>'))

    formatDate = (date, format) ->
      format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2))
      format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
      format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
      return format

    date = new Date(tweet.created_at)
    element.find('.created_at').text(formatDate(date, 'hh:mm:ss'))

    if tweet.favorited
      element.find('.favorite_button').addClass('active')

    element
